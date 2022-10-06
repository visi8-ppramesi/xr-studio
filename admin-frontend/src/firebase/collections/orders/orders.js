import Collection from "../../core/collection";

export default class extends Collection{
    static collection = 'orders'
    static orderByParam = 'name'
    static fields = {
        created_date: Date,
        current_order: Subcollection.resolve('./subcollections/orderVersions'),
    }
}