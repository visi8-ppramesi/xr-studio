import {
    EntityReference,
} from "ppramesi-firecms";

export type UserData = {
    id: EntityReference,
    name?: string
}

export type Asset = {
    name: string,
    description: string,
    created_date: Date,
    categories: string[],
    group?: string,
    preview_url: string[],
    user_data: UserData,
    assets_url: string,
    price: number,
}

export type AssetCategory = {
    name: string
}

export type ContractTemplates = {
    name: string,
    contract_data_fields: string[],
    contract_file_url: string,
    contract_text: string
}

export type Equipment = {
    name: string,
    category: string[],
    price: number,
    model: string,
    manufacturer: string,
    description: string,
    on_inventory: number,
    preview_url: string,
}

export type ManufacturerModels = {
    [manufacturer: string]: string[]
}

export type EquipmentCategory = {
    name: string
}

export type EquipmentType = {
    manufacturer_name: string,
    models: string[]
}
export type ProcedureField = {
    label: string,
    name: string,
    type: string
}

export type ProcedureItem = {
    name: string,
    optional_fields: ProcedureField[],
    required_fields: ProcedureField[],
}

export type ProcedureIncluded = {
    description: string,
    name: string,
    price: number
}

export type ProcedureType = {
    name: string,
    description: string,
    items_included: ProcedureIncluded[],
    procedure_code: string,
    procedures: ProcedureItem[],
    stackable: number,
    price: number,
    price_unit: string
}

export type ShootAsset = {
    created_date: Date,
    asset: object,
    asset_id: EntityReference,
    price: number,
}

export type ShootEquipment = {
    created_date: Date,
    equipment: object,
    equipment_id: EntityReference,
    price_item: number,
    quantity: number,
    total_price: number,
}

export type ShootProcedure = {
    created_date: Date,
    price: number,
    procedure_end: Date,
    procedure_start: Date,
    procedure_type: EntityReference
}

export type Shoot = {
    created_by: EntityReference,
    created_date: Date,
    location: string,
    status: string[],
    status_history: object[],
}

export type StatusItem = {
    date: Date,
    note: string,
    processed_by: null,
    status: string
}

export type SubmissionForm = {
    asset: EntityReference,
    current_status: string[],
    description: string,
    preview_urls: string,
    status_history: StatusItem[],
    submission_date: Date,
    updated_date: Date,
    user: EntityReference,
}

export type User = {
    username: string,
    email: string,
    full_name: string,
    profile_image_url: string,
    public_key: string,
    encrypted_private_key: string,
}

export type UserRoles = {
    roles: string[]
}

export type Test = {
    test_image: string,
    test_string: string,
    test_test: string
}