import {
    buildCollection,
} from "ppramesi-firecms";
import { EquipmentCategory } from "@/types";

export const equipmentCategoryCollection = buildCollection<EquipmentCategory>({
    name: "Equipment Categories",
    path: "equipment_categories",
    properties: {
        name: {
            name: "Name",
            dataType: "string",
        }
    }
})