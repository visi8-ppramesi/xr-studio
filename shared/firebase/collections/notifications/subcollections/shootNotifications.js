import Subcollection from "../../../core/subcollection";

export default class extends Subcollection{
    static collection = 'shoot_notifications'
    static parentCollection = 'notifications'
    static fields = {
        shoot: Subcollection.resolve('../../shoots/shoots'),
        created_date: Date,
        status: String,
        status_message: String,
        user_type: String
    }
}