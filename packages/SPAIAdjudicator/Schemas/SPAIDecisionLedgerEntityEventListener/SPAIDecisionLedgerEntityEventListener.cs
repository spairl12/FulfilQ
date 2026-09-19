namespace SPAIAdjudicator.EntryPoints.EntityEventListeners
{
	using System;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Entities.Events;

	/// <summary>
	/// Makes SPAIDecisionLedger append-only at the entity layer.
	/// Object permissions can be overridden by the "Edit any data" / "Delete any data" system
	/// operations held by administrators; this listener cannot.
	/// - Updates are refused for every user, including Supervisor.
	/// - Deletes are refused for every user except members of the "Ledger Administrators"
	///   break-glass role, and every permitted delete is itself recorded as a new ledger entry.
	/// Inserts are untouched.
	/// </summary>
	[EntityEventListener(SchemaName = "SPAIDecisionLedger")]
	public class SPAIDecisionLedgerEntityEventListener : BaseEntityEventListener
	{
		private static readonly Guid LedgerAdministratorsRoleId = new Guid("7531c8da-2b8f-4853-ba0b-419df03807a7");
		private static readonly Guid HumanOverrideDecisionTypeId = new Guid("a145dd29-a894-4fbe-9f5e-99f5cdf6cbfa");

		private const string UpdateRefused =
			"The Decision ledger is append-only. Existing entries cannot be changed; record a new entry instead.";
		private const string DeleteRefused =
			"The Decision ledger is append-only. Entries can only be deleted by a Ledger Administrator.";

		public override void OnUpdating(object sender, EntityBeforeEventArgs e) {
			base.OnUpdating(sender, e);
			e.IsCanceled = true;
			throw new InvalidOperationException(UpdateRefused);
		}

		public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
			base.OnDeleting(sender, e);
			var entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
			if (!IsLedgerAdministrator(userConnection)) {
				e.IsCanceled = true;
				throw new InvalidOperationException(DeleteRefused);
			}
			RecordDeletion(userConnection, entity.PrimaryColumnValue);
		}

		private static bool IsLedgerAdministrator(UserConnection userConnection) {
			var select = new Select(userConnection)
				.Column(Func.Count("Id"))
				.From("SysAdminUnitInRole")
				.Where("SysAdminUnitId").IsEqual(Column.Parameter(userConnection.CurrentUser.Id))
				.And("SysAdminUnitRoleId").IsEqual(Column.Parameter(LedgerAdministratorsRoleId)) as Select;
			return select.ExecuteScalar<int>() > 0;
		}

		private static void RecordDeletion(UserConnection userConnection, Guid deletedId) {
			EntitySchema schema = userConnection.EntitySchemaManager.GetInstanceByName("SPAIDecisionLedger");
			Entity deleted = schema.CreateEntity(userConnection);
			if (!deleted.FetchFromDB(deletedId)) {
				return;
			}
			string summary = string.Format(
				"Deleted entry {0}: sequence {1}, actor '{2}', occurred {3:u}, prior '{4}', new '{5}'",
				deletedId,
				deleted.GetTypedColumnValue<int>("SPAISequence"),
				deleted.GetTypedColumnValue<string>("SPAIActor"),
				deleted.GetTypedColumnValue<DateTime>("SPAIOccurredOn"),
				deleted.GetTypedColumnValue<string>("SPAIPriorValue"),
				deleted.GetTypedColumnValue<string>("SPAINewValue"));
			Entity audit = schema.CreateEntity(userConnection);
			audit.SetDefColumnValues();
			audit.SetColumnValue("SPAIScheduleLineId", NullIfEmpty(deleted.GetTypedColumnValue<Guid>("SPAIScheduleLineId")));
			audit.SetColumnValue("SPAIOpportunityId", NullIfEmpty(deleted.GetTypedColumnValue<Guid>("SPAIOpportunityId")));
			audit.SetColumnValue("SPAIDecisionTypeId", HumanOverrideDecisionTypeId);
			audit.SetColumnValue("SPAIActor", userConnection.CurrentUser.Name);
			audit.SetColumnValue("SPAIPriorValue", Truncate(summary, 250));
			audit.SetColumnValue("SPAINewValue", "Entry deleted by Ledger Administrator (break-glass)");
			audit.SetColumnValue("SPAIComplianceChecks", Truncate(summary, 500));
			audit.SetColumnValue("SPAIOccurredOn", userConnection.CurrentUser.GetCurrentDateTime());
			audit.Save(false);
		}

		private static object NullIfEmpty(Guid value) {
			return value == Guid.Empty ? null : (object)value;
		}

		private static string Truncate(string value, int maxLength) {
			return value.Length <= maxLength ? value : value.Substring(0, maxLength);
		}
	}
}
