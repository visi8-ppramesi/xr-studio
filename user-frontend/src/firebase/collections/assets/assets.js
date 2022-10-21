import Collection from "../../core/collection";
import {
  StorageLink,
  InstanceProjection,
  ProfilePicture,
  ExternalURL,
} from "../../core/types";

export default class extends Collection {
  static collection = "assets";
  static orderByParam = "name";
  static fields = {
    name: String,
    description: String,
    categories: Array,
    group: String,
    preview_url: StorageLink,
    user_data: new InstanceProjection({
      id: String,
      name: String,
      profile_image_url: ProfilePicture,
    }),
    assets_url: ExternalURL,
  };
}
