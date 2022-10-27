import TrackedCollection from "../../core/trackedCollection";

export default class extends TrackedCollection {
  static collection = "equipments";
  static orderByParam = "name";
  static fields = {
    name: String,
    category: Array,
    price: Number,
    model: String,
    manufacturer: String,
    description: String,
    on_inventory: Number,
    preview_url: String,
  };
}
