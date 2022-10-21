import TrackedSubcollection from "../../../core/trackedSubcollection";
import Collection from "../../../core/collection";
import { InstanceProjection } from "../../../core/types";

export default class extends TrackedSubcollection {
  static collection = "equipments";
  static parentCollection = "shoots";
  static orderByParam = "name";
  static fields = {
    equipment: new InstanceProjection({
      id: String,
      name: String,
    }),
    equipment_id: Collection.resolve("../../equipments/equipments"),
    price: Number,
  };
}
