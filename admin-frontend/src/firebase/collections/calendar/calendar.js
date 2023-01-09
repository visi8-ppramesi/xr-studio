import Collection from "../../core/collection";
import { InstanceProjection } from "../../core/types";

export default class extends Collection {
  static collection = "calendar";
  static orderByParam = "start_date";
  static fields = {
    start_date: Date,
    end_date: Date,
    event_id: Collection.resolve("../shoots/shoot"),
    event: new InstanceProjection({
      status: Array,
      location: String,
    }),
  };
}
