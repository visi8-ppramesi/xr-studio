import Collection from "../../core/collection";
import { StorageLink } from "../../core/types";

export default class extends Collection {
  static collection = "submission_forms";
  static fields = {
    name: String,
    user: Collection.resolve("../../users/users"),
    description: String,
    preview_urls: StorageLink,
    current_status: Array,
    status_history: Array,
    submission_date: Date,
    updated_date: Date,
    asset: Collection.resolve("../../assets/assets"),
  };
}
