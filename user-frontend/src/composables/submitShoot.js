import { firebase } from "@/firebase";
import { vedhg } from "@/utils/dateRangeHash";
import axios from "axios";
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
const handleError = (e) => {
  return e;
};

const envDev = process.env.VUE_APP_MODE == "development";
console.log(process.env);

const structureData = function (data) {
  let { studio: procedures, asset: assets, equipment: equipments } = data;
  procedures = procedures.map((procedure) => {
    const [procedureStart, procedureEnd] = vedhg.decodeHash(procedure.id);
    const procedureType = procedure.extra_data.schedule_type;
    const price = procedure.price;
    return {
      procedure_start: procedureStart,
      procedure_end: procedureEnd,
      procedure_type: procedureType,
      price,
    };
  });
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

  return {
    procedures,
    assets,
    equipments,
    shoot: {},
  };
};

export async function createShoot(data) {
  try {
    const { auth } = firebase;
    const { currentUser } = auth;
    const managerUrl = new URL(process.env.VUE_APP_SHOOTING_MANAGER_URL);
    managerUrl.pathname = "create";
    const headers = {};
    if (currentUser) {
      const tokenId = await currentUser.getIdToken();
      headers.Authorization = `Bearer ${tokenId}`;
    } else {
      throw new Error("User not logged in");
    }
    const procData = structureData(data);
    if (envDev) {
      procData.debug = true;
    }

    return axios.post(managerUrl.toString(), procData, {
      headers,
    });
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function editShoot(data) {
  try {
    const { auth } = firebase;
    const { currentUser } = auth;
    const managerUrl = new URL(process.env.VUE_APP_SHOOTING_MANAGER_URL);
    managerUrl.pathname = "edit";
    const headers = {};
    if (currentUser) {
      const tokenId = await currentUser.getIdToken();
      headers.Authorization = `Bearer ${tokenId}`;
    } else {
      throw new Error("User not logged in");
    }
    const procData = structureData(data);
    if (envDev) {
      procData.debug = true;
    }

    return axios.post(managerUrl.toString(), procData, {
      headers,
    });
  } catch (error) {
    handleError(error);
    throw error;
  }
}
