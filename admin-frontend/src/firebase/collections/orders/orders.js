import Collection from "../../core/collection";
import Subcollection from "../../core/subcollection";

export default class extends Collection{
    static collection = 'orders'
    static orderByParam = 'name'
    static fields = {
        created_date: Date,
        current_order: Subcollection.resolve('./subcollections/orderVersions'),
    }
}