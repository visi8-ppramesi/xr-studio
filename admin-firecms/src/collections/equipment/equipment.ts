import {
    buildCollection,
    EntityOnFetchProps,
    EnumValueConfig,
    EntityReference,
    EntityIdUpdateProps,
    EnumValues
} from "@camberi/firecms";
import { rewriteIdUpdate } from "@utils/id"
import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import debounce from "lodash/debounce"
import isNil from "lodash/isNil"
import { Dispatch, SetStateAction } from "react"


type Equipment = {
    name: string,
    category: string[],
    price: number,
    model: string,
    manufacturer: string,
    description: string,
    on_inventory: number,
    preview_url: string,
}

type ManufacturerModels = {
    [manufacturer: string]: string[]
}

export const buildEquipmentCollection = function(
        categoryState: [ EnumValues, Dispatch<SetStateAction<EnumValues>> ], 
        manufacturerState: [ EnumValues, Dispatch<SetStateAction<EnumValues>> ], 
        modelState: [ EnumValues, Dispatch<SetStateAction<EnumValues>> ],
        modelsState: [ ManufacturerModels, Dispatch<SetStateAction<ManufacturerModels>> ]
    ){
    const [ category, setCategory ] = categoryState
    const [ manufacturer, setManufacturer ] = manufacturerState
    const [ model, setModel ] = modelState
    const [ models, setModels ] = modelsState
    const letsGoGetShit = debounce(async function(){
        const categoriesPromise = getDocs(collection(db, "equipment_categories")).then((snap) => {
            const ids: EnumValues = snap.docs.map(v => {
                const id = v.get("name")
                const name = v.get("name")
                const value: EnumValueConfig = { id, label: name }
                return value
            })
            setCategory(ids)
        })
        const manufacturerPromise = getDocs(collection(db, "equipment_types")).then((snap) => {
            const manufacturerModels: ManufacturerModels = {}
            const ids: EnumValues = snap.docs.map(v => {
                const id = v.get("manufacturer_name")
                const name = v.get("manufacturer_name")
                manufacturerModels[v.get("manufacturer_name")] = v.get("models")
                const value: EnumValueConfig = { id, label: name }
                return value
            })
            setModels(manufacturerModels)
            setManufacturer(ids)
        })
        await Promise.all([ categoriesPromise, manufacturerPromise ])
    }, 10000, { leading: true, trailing: false })
    const debouncedRewriteId = rewriteIdUpdate<Equipment>()
    return buildCollection<Equipment>({
        name: "Equipment",
        path: "equipments",
        callbacks: {
            onFetch(entityFetchProps: EntityOnFetchProps) {
                return new Promise((resolve) => {
                    letsGoGetShit().then(() => {
                        resolve(entityFetchProps.entity)
                    })
                })
            },

            onIdUpdate: function(idUpdateProps: EntityIdUpdateProps<Equipment>){
                const myManufacturer = idUpdateProps?.values?.manufacturer
                if(!isNil(myManufacturer)) {
                    const myVals = models[myManufacturer].map((modelItem) => {
                        const value: EnumValueConfig = { id: modelItem, label: modelItem }
                        return value
                    })
                    setModel(myVals)
                }
                return debouncedRewriteId(idUpdateProps)
            }
        },
        properties: {
            name: {
                name: "Name",
                dataType: "string"
            },
            category: {
                name: "Category",
                dataType: "array",
                of: {
                    dataType: "string",
                    enumValues: category
                }
            },
            price: {
                name: "Price",
                dataType: "number"
            },
            manufacturer: {
                name: "Manufacturer",
                dataType: "string",
                enumValues: manufacturer
            },
            model: {
                name: "Model",
                dataType: "string",
                enumValues: model
            },
            description: {
                name: "Description",
                dataType: "string"
            },
            on_inventory: {
                name: "Inventory",
                dataType: "number"
            },
            preview_url: {
                name: "Preview URL",
                dataType: "string",
                storage: {
                    storagePath: "equipments",
                    acceptedFiles: ["image/*"],
                    metadata: {
                        cacheControl: "max-age=1000000"
                    },
                    fileName: (context) => {
                        return Math.random().toString(36).substring(2) + context.file.name;
                    }
                }
            },
        }
    })
}