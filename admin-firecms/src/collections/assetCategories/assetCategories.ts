import {
    buildCollection
} from "ppramesi-firecms";
import { AssetCategory } from "@/types";

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