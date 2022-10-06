import Collection from "../../core/collection";
import { InstanceProjectionArray, StorageLink, ExternalURL } from "../../core/types";

export default class extends Collection{
    static collection = 'shoots'
    static fields = {
        creation_date: Date,
        locked_in_start_date: Date,
        locked_in_end_date: Date,
        location: String,
        assets: new InstanceProjectionArray({
            name: String,
            preview_url: StorageLink,
            assets_url: ExternalURL
        }),
        order: Collection.resolve('../../orders/orders'),
        current_statuses: Array,
        status_history: Array,
        procedure_type: Collection.resolve('../../procedure-types/procedureTypes'),
    }
}