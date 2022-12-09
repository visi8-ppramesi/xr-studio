import TrackedSubcollection from "../../../core/trackedSubcollection";
import Collection from "../../../core/collection";
import { InstanceProjection } from "../../../core/types";

export default class extends TrackedSubcollection {
  static collection = "procedures";
  static parentCollection = "shoots";
  static orderByParam = "name";
  static fields = {
    status: Array,
    procedure_type: Collection.resolve("../../procedure-types/procedureTypes"),
    procedure_type_data: new InstanceProjection({
      name: String,
      procedure_definition: Array,
    }),
    procedure_data: Object,
    price: Number,
  };

  static async getProcedures(path) {
    const procedures = await this.getDocuments(path);
    return procedures;
  }
}
