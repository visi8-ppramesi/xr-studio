import Subcollection from "../../../core/subcollection";
import Collection from "../../../core/collection";

export default class extends Subcollection {
  static collection = "order_versions";
  static parentCollection = "orders";
  static orderByParam = "name";
  static fields = {
    items: Array,
    itemized_price: Array,
    total_price: Number,
    tax: Number,
    status: Array,
    payment_method: String,
    subject: String,
    location: String,
    shoot: Collection.resolve("../../shoots/shoots"),
    payments: Collection.resolve("../../payments/payments"),
    current_hash: String,
    previous_hash: String,
    signatures: Array,
  };
}
