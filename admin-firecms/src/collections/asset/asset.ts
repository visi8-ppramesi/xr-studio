import {
    buildCollection, EntityReference,
} from "@camberi/firecms";

type UserData = {
    id: EntityReference,
    name?: string
}

type Asset = {
    name: string,
    description: string,
    created_date: Date,
    categories: string[],
    group?: string,
    preview_url: string[],
    user_data: UserData,
    assets_url: string,
    price: number,
}

export const assetCollection = buildCollection<Asset>({
    name: "Asset",
    path: "assets",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        created_date: {
            name: "Created Date",
            dataType: "date"
        },
        categories: {
            name: "Categories",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        group: {
            name: "Group",
            dataType: "string"
        },
        preview_url: {
            name: "Preview URL",
            dataType: "array",
            of: {
                dataType: "string",
                storage: {
                    storagePath: "assets",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: (context) => {
                        return Math.random().toString(36).substring(2) + context.file.name;
                    }
                }
            }
        },
        user_data: {
            name: "User Data",
            dataType: "map",
            properties: {
                id: {
                    name: "User ID",
                    dataType: "reference",
                    path: "users"
                },
                name: {
                    name: "Name",
                    dataType: "string"
                }
            }
        },
        assets_url: {
            name: "Asset URL",
            dataType: "string"
        },
        price: {
            name: "Unit Price",
            dataType: "number"
        }
    }
})