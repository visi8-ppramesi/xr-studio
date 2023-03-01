import Collection from "../../core/collection";

export default class extends Collection{
    static collection = "studio_tours"
    static fields = {
        status: String,
        tour_start_date: Date, //assume full day?
        tour_end_date: Date,
        location: String,
        notes: String,
        contact_email: String,
        requested_by: Collection.resolve('../users/users'),
    }
}