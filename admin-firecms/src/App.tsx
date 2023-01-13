import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import { firebaseConfig } from "@utils/firebase"
import {
  Authenticator,
  // buildCollection,
  // buildProperty,
  // EntityReference,
  FirebaseCMSApp,
  FirebaseLoginView,
  FirebaseLoginViewProps
} from "@camberi/firecms";

import { userCollection } from "./collections/user/user";
import { shootCollection } from "./collections/shoot/shoot";
import { assetCollection } from "./collections/asset/asset";
import { equipmentCollection } from "./collections/equipment/equipment";
import { procedureTypeCollection } from "./collections/procedureType/procedureType";
import { contractTemplatesCollection } from "./collections/contractTemplates/contractTemplates";
import { submissionFormsCollection } from "./collections/submissionForms/submissionForms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

// TODO: Replace with your config
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const locales = {
//   "en-US": "English (United States)",
// };

// type ShootAsset = {
//   created_date: Date,
//   asset: object,
//   asset_id: EntityReference,
//   price: number,
// }
// type ShootEquipment = {
//   created_date: Date,
//   equipment: object,
//   equipment_id: EntityReference,
//   price_item: number,
//   quantity: number,
//   total_price: number,
// }
// type ShootProcedure = {
//   created_date: Date,
//   price: number,
//   procedure_end: Date,
//   procedure_start: Date,
//   procedure_type: EntityReference
// }
// type Shoot = {
//   created_by: EntityReference,
//   created_date: Date,
//   location: string,
//   status: string[],
//   status_history: Object[],
// }
// type User = {
//   username: string,
//   email: string,
//   full_name: string,
//   profile_image_url: string,
//   public_key: string,
//   encrypted_private_key: string,
// }

// const shootAssetCollection = buildCollection<ShootAsset>({
//   name: "Shoot Asset",
//   path: "assets",
//   properties: {
//     created_date: {
//       name: "Created Date",
//       dataType: "date"
//     },
//     asset: {
//       name: "Asset Details",
//       dataType: "map"
//     },
//     asset_id: {
//       name: "Asset",
//       dataType: "reference",
//       path: "assets"
//     },
//     price: {
//       name: "Price",
//       dataType: "number"
//     }
//   }
// })
// const shootEquipmentCollection = buildCollection<ShootEquipment>({
//   name: "Shoot Equipment",
//   path: "equipments",
//   properties: {
//     created_date: {
//       name: "Created Date",
//       dataType: "date"
//     },
//     equipment: {
//       name: "Equipment Details",
//       dataType: "map"
//     },
//     equipment_id: {
//       name: "Equipment",
//       dataType: "reference",
//       path: "equipments"
//     },
//     price_item: {
//       name: "Price per item",
//       dataType: "number"
//     },
//     quantity: {
//       name: "Quantity",
//       dataType: "number"
//     },
//     total_price: {
//       name: "Total Price",
//       dataType: "number"
//     },
//   }
// })

// const shootProcedureCollection = buildCollection<ShootProcedure>({
//   name: "Shoot Procedure",
//   path: "procedures",
//   properties: {
//     created_date: {
//       name: "Created Date",
//       dataType: "date"
//     },
//     procedure_start: {
//       name: "Start Date",
//       dataType: "date"
//     },
//     procedure_end: {
//       name: "End Date",
//       dataType: "date",
//     },
//     procedure_type: {
//       name: "Procedure Type",
//       dataType: "reference",
//       path: "procedure_types"
//     },
//     price: {
//       name: "Price",
//       dataType: "number"
//     }
//   }
// })

// const userCollection = buildCollection<User>({
//   name: "User",
//   path: "users",
//   properties: {
//     username: {
//       name: "Username",
//       dataType: "string"
//     },
//     email: {
//       name: "Email",
//       dataType: "string"
//     },
//     full_name: {
//       name: "Full Name",
//       dataType: "string"
//     },
//     profile_image_url: {
//       name: "Profile Image Url",
//       dataType: "string"
//     },
//     public_key: {
//       name: "Username",
//       dataType: "string"
//     },
//     encrypted_private_key: {
//       name: "Username",
//       dataType: "string"
//     }
//   }
// })

// const shootCollection = buildCollection<Shoot>({
//   name: "Shoot",
//   path: "shoots",
//   properties: {
//     created_by: {
//       name: "Created By",
//       dataType: "reference",
//       path: "users"
//     },
//     created_date: {
//       name: "Created Date",
//       dataType: "date"
//     },
//     location: {
//       name: "Location",
//       dataType: "string"
//     },
//     status: {
//       name: "Status",
//       dataType: "array",
//       of: {
//         dataType: "string"
//       }
//     },
//     status_history: {
//       name: "Status History",
//       dataType: "array",
//       of: {
//         dataType: "map",
//         properties: {
//           date: {
//             name: "Date",
//             dataType: "date"
//           },
//           note: {
//             name: "Note",
//             dataType: "string"
//           },
//           processed_by: {
//             name: "Processed By",
//             dataType: "reference",
//             path: "users"
//           },
//           status: {
//             name: "Status",
//             dataType: "string"
//           },
//         }
//       }
//     }
//   },
//   subcollections: [
//     shootAssetCollection,
//     shootEquipmentCollection,
//     shootProcedureCollection
//   ]
// });

// type Product = {
//   name: string;
//   price: number;
//   status: string;
//   published: boolean;
//   related_products: EntityReference[];
//   main_image: string;
//   tags: string[];
//   description: string;
//   categories: string[];
//   publisher: {
//     name: string;
//     external_id: string;
//   },
//   expires_on: Date
// }

// const localeCollection = buildCollection({
//   path: "locale",
//   customId: locales,
//   name: "Locales",
//   singularName: "Locales",
//   properties: {
//     name: {
//       name: "Title",
//       validation: { required: true },
//       dataType: "string"
//     },
//     selectable: {
//       name: "Selectable",
//       description: "Is this locale selectable",
//       dataType: "boolean"
//     },
//     video: {
//       name: "Video",
//       dataType: "string",
//       validation: { required: false },
//       storage: {
//         storagePath: "videos",
//         acceptedFiles: ["video/*"]
//       }
//     }
//   }
// });

// const productsCollection = buildCollection<Product>({
//   name: "Products",
//   singularName: "Product",
//   path: "products",
//   permissions: ({ authController }) => ({
//     edit: true,
//     create: true,
//     // we have created the roles object in the navigation builder
//     delete: false
//   }),
//   subcollections: [
//     localeCollection
//   ],
//   properties: {
//     name: {
//       name: "Name",
//       validation: { required: true },
//       dataType: "string"
//     },
//     price: {
//       name: "Price",
//       validation: {
//         required: true,
//         requiredMessage: "You must set a price between 0 and 1000",
//         min: 0,
//         max: 1000
//       },
//       description: "Price with range validation",
//       dataType: "number"
//     },
//     status: {
//       name: "Status",
//       validation: { required: true },
//       dataType: "string",
//       description: "Should this product be visible in the website",
//       longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
//       enumValues: {
//         private: "Private",
//         public: "Public"
//       }
//     },
//     published: ({ values }) => buildProperty({
//       name: "Published",
//       dataType: "boolean",
//       columnWidth: 100,
//       disabled: (
//         values.status === "public"
//           ? false
//           : {
//             clearOnDisabled: true,
//             disabledMessage: "Status must be public in order to enable this the published flag"
//           }
//       )
//     }),
//     related_products: {
//       dataType: "array",
//       name: "Related products",
//       description: "Reference to self",
//       of: {
//         dataType: "reference",
//         path: "products"
//       }
//     },
//     main_image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
//       name: "Image",
//       dataType: "string",
//       storage: {
//         storagePath: "images",
//         acceptedFiles: ["image/*"]
//       }
//     }),
//     tags: {
//       name: "Tags",
//       description: "Example of generic array",
//       validation: { required: true },
//       dataType: "array",
//       of: {
//         dataType: "string"
//       }
//     },
//     description: {
//       name: "Description",
//       description: "Not mandatory but it'd be awesome if you filled this up",
//       longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
//       dataType: "string",
//       columnWidth: 300
//     },
//     categories: {
//       name: "Categories",
//       validation: { required: true },
//       dataType: "array",
//       of: {
//         dataType: "string",
//         enumValues: {
//           electronics: "Electronics",
//           books: "Books",
//           furniture: "Furniture",
//           clothing: "Clothing",
//           food: "Food"
//         }
//       }
//     },
//     publisher: {
//       name: "Publisher",
//       description: "This is an example of a map property",
//       dataType: "map",
//       properties: {
//         name: {
//           name: "Name",
//           dataType: "string"
//         },
//         external_id: {
//           name: "External id",
//           dataType: "string"
//         }
//       }
//     },
//     expires_on: {
//       name: "Expires on",
//       dataType: "date"
//     }
//   }
// });

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
    user,
    authController
  }) => {

    if (user?.email?.includes("flanders")) {
      throw Error("Stupid Flanders!");
    }

    console.log("Allowing access to", user?.email);
    // This is an example of retrieving async data related to the user
    // and storing it in the user extra field.
    const sampleUserRoles = await Promise.resolve(["admin"]);
    authController.setExtra(sampleUserRoles);

    return true;
  }, []);

  const ShitFuckLoginView = function({ allowSkipLogin, logo, signInOptions, firebaseApp, authController, noUserComponent, disabled, additionalComponent, notAllowedError }: FirebaseLoginViewProps){
    return FirebaseLoginView({
      allowSkipLogin, logo, signInOptions, firebaseApp, authController, noUserComponent, disabled, additionalComponent, notAllowedError,
      disableSignupScreen: true
    })
  }

  return <FirebaseCMSApp
    name={"XR Studio Backend"}
    authentication={myAuthenticator}
    collections={[shootCollection, userCollection, assetCollection, equipmentCollection, procedureTypeCollection, contractTemplatesCollection, submissionFormsCollection]}
    firebaseConfig={firebaseConfig}
    signInOptions={["password", "google.com"]}
    LoginView={ShitFuckLoginView}
  />;
}