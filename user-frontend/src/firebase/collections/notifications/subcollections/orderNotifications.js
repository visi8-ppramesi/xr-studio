import Subcollection from "../../../core/subcollection";

export default class extends Subcollection {
  static collection = "order_notifications";
  static parentCollection = "notifications";
  static fields = {
    order: Subcollection.resolve("../../orders/orders"),
    created_date: Date,
    status: String,
    status_message: String,
    user_type: String,
  };
}
