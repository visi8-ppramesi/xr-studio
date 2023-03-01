// import { firebase } from "@/firebase";
import { vedhg } from "@/utils/dateRangeHash";
// import axios from "axios";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import { createPostRequest } from "./utils/postRequestUtils";
/*
    procedures: [
        {
            status: ["initialized", "unpaid"],
            procedure_type: ("something"),
            procedure_start: new Date(),
            procedure_end: new Date(),
            price: 100_000_000
        },
        {
            status: ["initialized", "unpaid"],
            procedure_type: ("something"),
            procedure_start: new Date(),
            procedure_end: new Date(),
            price: 100_000_000
        }
    ],
    equipments: [
        {
            equipment: {
                id: "something",
                name: "asdfasdf"
            },
            equipment_id: ("something"),
            quantity: 100,
            price_item: 1000000,
            total_price: 100 * 1000000
        },
    ],
    assets: [
        {
            asset: {
                id: "something",
                name: "asdfasdf"
            },
            asset_id: ("something"),
            price: 100_000_000,
        }
    ],
    shoot: {
        
    }
*/
const isEmptyOrDate = function (value) {
  if (value instanceof Date) {
    return isNaN(value);
  } else {
    return isEmpty(value);
  }
};

const handleError = (e) => {
  return e;
};

const forceToDate = function (date) {
  return new Date(date);
};

const structureShootData = function (data) {
  let {
    shoot,
    studio: procedures,
    asset: assets,
    equipment: equipments,
  } = data;
  procedures = procedures.map((procedure) => {
    const [procedureStart, procedureEnd] = vedhg.decodeHash(procedure.id);
    const procedureType = procedure.extra_data.schedule_type;
    const price = procedure.price;
    return {
      procedure_start: forceToDate(procedureStart),
      procedure_end: forceToDate(procedureEnd),
      procedure_type: procedureType,
      price,
      procedure_data: {
        notes: procedure.extra_data.notes,
      },
    };
  });
  const retVal = {
    procedures,
    shoot: shoot || {},
  };
  if (!isNil(assets)) {
    assets = assets.map((asset) => {
      return {
        asset: {
          name: asset.name,
          id: asset.id,
        },
        asset_id: asset.id,
        price: asset.price,
      };
    });
    retVal.assets = assets;
  }
  if (!isNil(equipments)) {
    equipments = equipments.map((equipment) => {
      return {
        equipment: {
          name: equipment.name,
          id: equipment.id,
        },
        equipment_id: equipment.id,
        quantity: equipment.count,
        price_item: equipment.price,
        total_price: equipment.count * equipment.price,
      };
    });
    retVal.equipments = equipments;
  }

  return retVal;
};

const structureProcedureData = function (data) {
  let { shoot, procedure } = data;
  const dataObj = {
    shoot_id: shoot.id,
    procedure_id: procedure.id,
    procedure_data: !isNil(procedure?.extra_data)
      ? {
          notes: procedure?.extra_data?.notes,
        }
      : null,
    procedure_start: forceToDate(procedure.procedure_start),
    procedure_end: forceToDate(procedure.procedure_end),
    procedure_type: procedure.procedure_type,
  };

  return omitBy(dataObj, isEmptyOrDate);
};

const editProcedurePostRequest = createPostRequest(
  process.env.VUE_APP_SHOOTING_MANAGER_URL,
  "editProcedure",
  "edit-procedure",
  structureProcedureData,
  handleError
);
const createShootPostRequest = createPostRequest(
  process.env.VUE_APP_SHOOTING_MANAGER_URL,
  "createShoot",
  "create",
  structureShootData,
  handleError
);
const editShootPostRequest = createPostRequest(
  process.env.VUE_APP_SHOOTING_MANAGER_URL,
  "editShoot",
  "edit",
  structureShootData,
  handleError
);

export async function editProcedure(data) {
  return editProcedurePostRequest(data);
}

export async function createShoot(data) {
  return createShootPostRequest(data);
}

export async function editShoot(data) {
  return editShootPostRequest(data);
}
