import {
  buildCollection,
  EntityReference,
} from "@camberi/firecms";
import { rewriteIdUpdate } from "@utils/id"

type ShootAsset = {
  created_date: Date,
  asset: object,
  asset_id: EntityReference,
  price: number,
}

export const shootAssetCollection = buildCollection<ShootAsset>({
  name: "Shoot Asset",
  path: "assets",
  callbacks: {
      onIdUpdate: rewriteIdUpdate<ShootAsset>()
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