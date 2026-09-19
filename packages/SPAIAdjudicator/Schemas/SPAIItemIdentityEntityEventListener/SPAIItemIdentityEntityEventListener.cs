namespace SPAIAdjudicator.EntryPoints.EntityEventListeners
{
	using System;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Entities.Events;

	/// <summary>
	/// Keeps the call-up sheet identity and fulfilment figures consistent on every write path
	/// (pages, DataService, OData, business processes, imports).
	/// - SPAIDisplayRef = item ref + " ALT" when an approved alternative + " " + variant (e.g. "FR-01 ALT RH").
	///   This is the reference printed on the call-up sheet; it must survive from tender to order unchanged.
	/// - SPAIQtyRemaining (schedule line only) = order qty - received on site, never below zero.
	/// </summary>
	public static class SPAIItemIdentity
	{
		public static string DisplayRef(string itemRef, bool isAlternative, string variant) {
			if (string.IsNullOrWhiteSpace(itemRef)) {
				return string.Empty;
			}
			string result = itemRef.Trim();
			if (isAlternative) {
				result += " ALT";
			}
			if (!string.IsNullOrWhiteSpace(variant)) {
				result += " " + variant.Trim();
			}
			return result;
		}

		/// <summary>True only when every column is loaded, so a partially loaded entity is never blanked.</summary>
		public static bool AllLoaded(Entity entity, params string[] columns) {
			foreach (string column in columns) {
				if (!entity.IsColumnValueLoaded(column)) {
					return false;
				}
			}
			return true;
		}

		public static void ApplyDisplayRef(Entity entity) {
			if (!AllLoaded(entity, "SPAIItemCode", "SPAIIsAlternative", "SPAIAlternateVariant")) {
				return;
			}
			string displayRef = DisplayRef(entity.GetTypedColumnValue<string>("SPAIItemCode"),
				entity.GetTypedColumnValue<bool>("SPAIIsAlternative"),
				entity.GetTypedColumnValue<string>("SPAIAlternateVariant"));
			if (entity.GetTypedColumnValue<string>("SPAIDisplayRef") != displayRef) {
				entity.SetColumnValue("SPAIDisplayRef", displayRef);
			}
		}
	}

	[EntityEventListener(SchemaName = "SPAIScheduleLine")]
	public class SPAIScheduleLineEntityEventListener : BaseEntityEventListener
	{
		public override void OnSaving(object sender, EntityBeforeEventArgs e) {
			base.OnSaving(sender, e);
			var entity = (Entity)sender;
			SPAIItemIdentity.ApplyDisplayRef(entity);
			if (!SPAIItemIdentity.AllLoaded(entity, "SPAIQuantity", "SPAIQtyReceived")) {
				return;
			}
			int remaining = Math.Max(0, entity.GetTypedColumnValue<int>("SPAIQuantity")
				- entity.GetTypedColumnValue<int>("SPAIQtyReceived"));
			if (entity.GetTypedColumnValue<int>("SPAIQtyRemaining") != remaining) {
				entity.SetColumnValue("SPAIQtyRemaining", remaining);
			}
		}
	}

	[EntityEventListener(SchemaName = "OrderProduct")]
	public class SPAIOrderProductEntityEventListener : BaseEntityEventListener
	{
		public override void OnSaving(object sender, EntityBeforeEventArgs e) {
			base.OnSaving(sender, e);
			SPAIItemIdentity.ApplyDisplayRef((Entity)sender);
		}
	}
}
