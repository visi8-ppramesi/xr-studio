import Collection from "../../core/collection";

export default class extends Collection {
  static collection = "procedure_types";
  static fields = {
    name: String,
    description: String,
    procedure_code: String,
    procedures: Array,
  };
}
