import {
    buildCollection,
} from "ppramesi-firecms";
import { EquipmentType } from "@/types";

export const equipmentTypeCollection = buildCollection<EquipmentType>({
    name: "Asset Types",
    path: "equipment_types",
    properties: {
        manufacturer_name: {
            name: "Name",
            dataType: "string",
        },
        models: {
            name: "Models",
            dataType: "array",
            of: {
                dataType: "string"
            }
        }
    }
})