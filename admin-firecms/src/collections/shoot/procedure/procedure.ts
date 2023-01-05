
import {
  buildCollection,
  EntityReference,
} from "@camberi/firecms";

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