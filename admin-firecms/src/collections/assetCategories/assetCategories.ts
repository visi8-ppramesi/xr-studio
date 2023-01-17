import {
    buildCollection
} from "@camberi/firecms";

type AssetCategory = {
    name: string
}

export const assetCategoryCollection = buildCollection<AssetCategory>({
    name: "Asset Categories",
    path: "asset_categories",
    properties: {
        name: {
            name: "Name",
            dataType: "string",
        }
    }
})