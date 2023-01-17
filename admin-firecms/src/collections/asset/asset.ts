import {
    buildCollection,
    EntityOnFetchProps,
    EnumValueConfig,
    EntityReference,
    EnumValues
} from "@camberi/firecms";
import { rewriteIdUpdate } from "@utils/id"
import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import debounce from "lodash/debounce"
import { Dispatch, SetStateAction } from "react"

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

export const buildAssetCollection = function([customId, setCustomId]: [EnumValues, Dispatch<SetStateAction<EnumValues>>]){
    const letsGoCategories = debounce(async function(){
        await getDocs(collection(db, "asset_categories")).then((snap) => {
            const ids: EnumValues = snap.docs.map(v => {
                const id = v.get("name")
                const name = v.get("name")
                const value: EnumValueConfig = { id, label: name }
                return value
            })
            setCustomId(ids)
        })
    }, 10000, { leading: true, trailing: false })

    const debouncedRewriteId = rewriteIdUpdate<Asset>()
    return buildCollection<Asset>({
        name: "Asset",
        path: "assets",
        callbacks: {
            onFetch(entityFetchProps: EntityOnFetchProps) {
                return new Promise((resolve) => {
                    letsGoCategories().then(() => {
                        resolve(entityFetchProps.entity)
                    })
                })
            },
            onIdUpdate: debouncedRewriteId
        },
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
                    dataType: "string",
                    enumValues: customId
                }
            },
            group: {
                name: "Group",
                dataType: "array",
                of: {
                    dataType: "string"
                }
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
}