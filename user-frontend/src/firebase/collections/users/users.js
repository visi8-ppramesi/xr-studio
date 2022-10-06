import Collection from "../../core/collection";
import { InstanceProjectionArray, ProfilePicture } from "../../core/types";

export default class extends Collection{
    static collection = "users"
    static fields = {
        username: String,
        email: String,
        full_name: String,
        profile_image_url: ProfilePicture,
        groups: new InstanceProjectionArray({
            name: String,
            id: String
        }),
        public_key: String,
        encrypted_private_key: String,
    }
}