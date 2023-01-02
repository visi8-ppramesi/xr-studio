import TrackedSubcollection from "../../../core/trackedSubcollection";
import Collection from "../../../core/collection";
import { InstanceProjection } from "../../../core/types";

export default class extends TrackedSubcollection {
  static collection = "assets";
  static parentCollection = "shoots";
  static orderByParam = "name";
  static fields = {
    asset: new InstanceProjection({
      id: String,
      name: String,
    }),
    asset_id: Collection.resolve("../../assets/assets"),
    price: Number,
  };
}
