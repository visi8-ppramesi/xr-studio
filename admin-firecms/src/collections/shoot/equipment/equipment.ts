
import {
  buildCollection,
  EntityReference,
} from "@camberi/firecms";
import { rewriteIdUpdate } from "@utils/id"

type ShootEquipment = {
  created_date: Date,
  equipment: object,
  equipment_id: EntityReference,
  price_item: number,
  quantity: number,
  total_price: number,
}

const debouncedRewriteId = rewriteIdUpdate<ShootEquipment>()
export const shootEquipmentCollection = buildCollection<ShootEquipment>({
  name: "Shoot Equipment",
  path: "equipments",
  callbacks: {
      onIdUpdate: debouncedRewriteId
  },
  properties: {
    created_date: {
      name: "Created Date",
      dataType: "date"
    },
    equipment: {
      name: "Equipment Details",
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
    equipment_id: {
      name: "Equipment",
      dataType: "reference",
      path: "equipments"
    },
    price_item: {
      name: "Price per item",
      dataType: "number"
    },
    quantity: {
      name: "Quantity",
      dataType: "number"
    },
    total_price: {
      name: "Total Price",
      dataType: "number"
    },
  }
})