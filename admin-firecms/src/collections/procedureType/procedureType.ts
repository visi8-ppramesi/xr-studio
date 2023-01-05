import {
    buildCollection,
} from "@camberi/firecms";

type ProcedureType = {
    name: string,
    category: string[],
    price: number,
    model: string,
    manufacturer: string,
    description: string,
    on_inventory: number,
}

export const procedureTypeCollection = buildCollection<ProcedureType>({
    name: "Procedure Type",
    path: "procedure_types",
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        category: {
            name: "Category",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        price: {
            name: "Price",
            dataType: "number"
        },
        model: {
            name: "Model",
            dataType: "string"
        },
        manufacturer: {
            name: "Manufacturer",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        on_inventory: {
            name: "Inventory",
            dataType: "number"
        },
    }
})