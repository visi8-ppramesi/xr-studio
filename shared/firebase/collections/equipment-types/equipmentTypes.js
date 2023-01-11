import Collection from "../../core/collection";

export default class extends Collection{
    static collection = 'equipment_types'
    static fields = {
        manufacturer_name: String,
        models: Array
    }
}