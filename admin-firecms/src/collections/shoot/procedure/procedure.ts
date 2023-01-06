
import {
  buildCollection,
  EntityReference,
  EntityIdUpdateProps
} from "@camberi/firecms";
import { vedhg } from "@utils/dateRangeHash"

type ShootProcedure = {
  created_date: Date,
  price: number,
  procedure_end: Date,
  procedure_start: Date,
  procedure_type: EntityReference
}

export const shootProcedureCollection = buildCollection<ShootProcedure>({
  name: "Shoot Procedure",
  path: "procedures",
  callbacks: {
      onIdUpdate(idUpdateProps: EntityIdUpdateProps<ShootProcedure>) {
        const { values: { procedure_start, procedure_end, procedure_type}} = idUpdateProps
        return vedhg.encodeDates(procedure_start, procedure_end, procedure_type?.id)
      }
  },
  properties: {
    created_date: {
      name: "Created Date",
      dataType: "date"
    },
    procedure_start: {
      name: "Start Date",
      dataType: "date"
    },
    procedure_end: {
      name: "End Date",
      dataType: "date",
    },
    procedure_type: {
      name: "Procedure Type",
      dataType: "reference",
      path: "procedure_types"
    },
    price: {
      name: "Price",
      dataType: "number"
    }
  }
})