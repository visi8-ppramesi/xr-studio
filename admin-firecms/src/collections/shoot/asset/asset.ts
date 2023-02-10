import {
  buildCollection,
} from "ppramesi-firecms";
import { rewriteIdUpdate } from "@utils/id"
import { ShootAsset } from "@/types";

const debouncedRewriteId = rewriteIdUpdate<ShootAsset>()
export const shootAssetCollection = buildCollection<ShootAsset>({
  name: "Shoot Asset",
  path: "assets",
  callbacks: {
      onIdUpdate: debouncedRewriteId
  },
  properties: {
    created_date: {
      name: "Created Date",
      dataType: "date"
    },
    asset: {
      name: "Asset Details",
      dataType: "map",
      properties: {
        id: {
          name: "Id",
          dataType: "string",
        },
        name: {
          name: "Name",
          dataType: "string"
        }
      }
    },
    asset_id: {
      name: "Asset",
      dataType: "reference",
      path: "assets"
    },
    price: {
      name: "Price",
      dataType: "number"
    }
  }
})