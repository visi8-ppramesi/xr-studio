import Collection from "../../core/collection";
import Subcollection from "../../core/subcollection";

export default class extends Collection {
  static collection = "orders";
  static orderByParam = "name";
  static fields = {
    created_date: Date,
    current_order: Subcollection.resolve("./subcollections/orderVersions"),
  };

  static async getOrders() {
    const orders = await this.getDocuments();
    return orders;
  }

  static async getOrdersId(id) {
    const orders = await this.getDocument(id);
    return orders;
  }
}
