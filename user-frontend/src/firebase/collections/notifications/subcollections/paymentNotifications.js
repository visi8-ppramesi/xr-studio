import Subcollection from "../../../core/subcollection";

export default class extends Subcollection {
  static collection = "payment_notifications";
  static parentCollection = "notifications";
  static fields = {
    payment: Subcollection.resolve("../../payments/payments"),
    created_date: Date,
    status: String,
    status_message: String,
    user_type: String,
  };
}
