
import {
    buildCollection,
} from "@camberi/firecms";

type User = {
    username: string,
    email: string,
    full_name: string,
    profile_image_url: string,
    public_key: string,
    encrypted_private_key: string,
  }

export const userCollection = buildCollection<User>({
    name: "User",
    path: "users",
    properties: {
      username: {
        name: "Username",
        dataType: "string"
      },
      email: {
        name: "Email",
        dataType: "string"
      },
      full_name: {
        name: "Full Name",
        dataType: "string"
      },
      profile_image_url: {
        name: "Profile Image Url",
        dataType: "string",
        storage: {
            storagePath: "profile_pictures",
            acceptedFiles: ["image/*"],
            metadata: {
                cacheControl: "max-age=1000000"
            },
            fileName: (context) => {
                return Math.random().toString(36).substring(2) + context.file.name;
            }
        }
      },
      public_key: {
        name: "Username",
        dataType: "string"
      },
      encrypted_private_key: {
        name: "Username",
        dataType: "string"
      }
    }
})