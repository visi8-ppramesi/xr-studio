import Collection from "../../core/collection";

export default class extends Collection{
    static collection = 'equipment_categories'
    static fields = {
        name: String,
    }
}