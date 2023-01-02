import Collection from "../../core/collection";

export default class extends Collection {
  static collection = "calendar";
  static orderByParam = "start_date";
  static fields = {
    start_date: Date,
    end_date: Date,
    event: Collection.resolve("../shoots/shoot"),
  };
}
