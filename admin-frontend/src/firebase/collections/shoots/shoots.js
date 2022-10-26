import TrackedCollection from "../../core/trackedCollection";
import {
  InstanceProjectionArray,
  InstanceProjection,
  StorageLink,
  ExternalURL,
} from "../../core/types";

export default class extends TrackedCollection {
  static collection = "shoots";
  static fields = {
    creation_date: Date,
    locked_in_start_date: Date,
    locked_in_end_date: Date,
    location: String,
    assets: new InstanceProjectionArray({
      id: String,
      name: String,
      preview_url: StorageLink,
      assets_url: ExternalURL,
    }),
    creator: new InstanceProjection({
      username: String,
      id: String
    }),
    order: TrackedCollection.resolve("../../orders/orders"),
    current_statuses: Array,
    status_history: Array,
    // procedure_type: TrackedCollection.resolve("../../procedure-types/procedureTypes"),
  };
}
