import Collection from "../../core/collection";
import Subcollection from "../../core/subcollection";

export default class extends Collection {
  static collection = "contracts";
  static orderByParam = "name";
  static fields = {
    name: String,
    created_date: Date,
    contract_fields: Object,
    current_contract: Subcollection.resolve(
      "./subcollections/contractVersions"
    ),
    contract_type: String,
  };
}
