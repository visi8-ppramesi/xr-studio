
import {
  buildCollection,
  EntityIdUpdateProps,
  EntityOnSaveProps
} from "@camberi/firecms";
import { db } from "@utils/firebase"
import { collection, getDocs } from "firebase/firestore"
import { vedhg } from "@utils/dateRangeHash"
import isNil from "lodash/isNil"
import { ShootProcedure } from "@/types";

export const shootProcedureCollection = buildCollection<ShootProcedure>({
  name: "Shoot Procedure",
  path: "procedures",
  callbacks: {
      onPreSave(entitySaveProps: EntityOnSaveProps<ShootProcedure>) {
        const { values: { procedure_end, procedure_start, procedure_type }} = entitySaveProps
        if(isNil(procedure_end) || isNil(procedure_start)) {
          throw new Error("Procedure end or start is null")
        }
        const currentId = vedhg.encodeDates(procedure_start!, procedure_end!, procedure_type?.id)

        return new Promise((resolve, reject) => {
          const calendarRef = collection(db, "calendar")
          getDocs(calendarRef).then((snap) => {
            const overlap = Object.values(snap.docs).reduce((acc, v) => acc || vedhg.hashesOverlap(currentId, v.id), false)
            if(overlap){
              reject(new Error("Calendar overlap"))
            }else{
              resolve(entitySaveProps.values)
            }
          })
        })
      },
      onIdUpdate(idUpdateProps: EntityIdUpdateProps<ShootProcedure>) {
        const { values: { procedure_start, procedure_end, procedure_type }} = idUpdateProps
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