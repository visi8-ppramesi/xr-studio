import Collection from "../../core/collection";

export default class extends Collection {
  static collection = "procedure_types";
  static fields = {
    name: String,
    description: String,
    items_included: Array,
    procedure_code: String,
    procedures: Array,
    stackable: Number,
    price: Number,
    price_unit: String,
  };
}
