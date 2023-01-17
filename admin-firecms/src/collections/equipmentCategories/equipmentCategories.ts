import {
    buildCollection,
} from "@camberi/firecms";

type EquipmentCategory = {
    name: string
}

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