import {
  buildCollection,
} from "ppramesi-firecms";
import { shootAssetCollection } from "./asset/asset"
import { shootEquipmentCollection } from "./equipment/equipment"
import { shootProcedureCollection } from "./procedure/procedure"
import { rewriteIdUpdate } from "@utils/id"
import { Shoot } from "@/types";

const debouncedRewriteId = rewriteIdUpdate<Shoot>()
export const shootCollection = buildCollection<Shoot>({
  name: "Shoot",
  path: "shoots",
  callbacks: {
      onIdUpdate: debouncedRewriteId
  },
  properties: {
    created_by: {
      name: "Created By",
      dataType: "reference",
      path: "users"
    },
    created_date: {
      name: "Created Date",
      dataType: "date"
    },
    location: {
      name: "Location",
      dataType: "string"
    },
    status: {
      name: "Status",
      dataType: "array",
      of: {
        dataType: "string"
      }
    },
    status_history: {
      name: "Status History",
      dataType: "array",
      of: {
        dataType: "map",
        properties: {
          date: {
            name: "Date",
            dataType: "date"
          },
          note: {
            name: "Note",
            dataType: "string"
          },
          processed_by: {
            name: "Processed By",
            dataType: "reference",
            path: "users"
          },
          status: {
            name: "Status",
            dataType: "string"
          },
        }
      }
    }
  },
  subcollections: [
    shootAssetCollection,
    shootEquipmentCollection,
    shootProcedureCollection
  ]
});