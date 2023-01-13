import Collection from "../../core/collection";

export default class extends Collection {
  static collection = "asset_categories";
  static fields = {
    name: String,
  };
}
