import {
    buildCollection,
} from "@camberi/firecms";
import { ProcedureType } from "@/types";

export const procedureTypeCollection = buildCollection<ProcedureType>({
    name: "Procedure Type",
    path: "procedure_types",
    customId: true,
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        items_included: {
            name: "Included in Procedure",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    name: {
                        name: "Name",
                        dataType: "string"
                    },
                    description: {
                        name: "Description",
                        dataType: "string"
                    },
                    price: {
                        name: "Price",
                        dataType: "number"
                    },
                }
            }
        },
        procedure_code: {
            name: "Procedure Code",
            dataType: "string"
        },
        procedures: {
            name: "Procedures",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    name: {
                        name: "Name",
                        dataType: "string"
                    },
                    optional_fields: {
                        name: "Optional Fields",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties: {
                                label: {
                                    name: "Field Label",
                                    dataType: "string"
                                },
                                name: {
                                    name: "Field Name",
                                    dataType: "string"
                                },
                                type: {
                                    name: "Field Type",
                                    dataType: "string"
                                }
                            }
                        }
                    },
                    required_fields: {
                        name: "Required Fields",
                        dataType: "array",
                        of: {
                            dataType: "map",
                            properties: {
                                label: {
                                    name: "Field Label",
                                    dataType: "string"
                                },
                                name: {
                                    name: "Field Name",
                                    dataType: "string"
                                },
                                type: {
                                    name: "Field Type",
                                    dataType: "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        stackable: {
            name: "Stackable Group",
            dataType: "number"
        },
        price: {
            name: "Price",
            dataType: "number"
        },
        price_unit: {
            name: "Unit Price",
            dataType: "string"
        },
    }
})