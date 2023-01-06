import {
    buildCollection,
    buildProperty
} from "@camberi/firecms";
import { rewriteIdUpdate } from "@utils/id"

type Equipment = {
    name: string,
    category: string[],
    price: number,
    model: string,
    manufacturer: string,
    description: string,
    on_inventory: number,
    preview_url: string,
}

export const equipmentCollection = buildCollection<Equipment>({
    name: "Equipment",
    path: "equipments",
    callbacks: {
        onIdUpdate: rewriteIdUpdate<Equipment>()
    },
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        category: {
            name: "Category",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        price: {
            name: "Price",
            dataType: "number"
        },
        model: {
            name: "Model",
            dataType: "string"
        },
        manufacturer: {
            name: "Manufacturer",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        on_inventory: {
            name: "Inventory",
            dataType: "number"
        },
        preview_url: {
            name: "Preview URL",
            dataType: "string",
            storage: {
                storagePath: "equipments",
                acceptedFiles: ["image/*"],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return Math.random().toString(36).substring(2) + context.file.name;
                }
            }
        },
    }
})