import Collection from "../../core/collection";

export default class extends Collection{
    static collection = 'notifications'
    static fields = {
        unread_count: Number
    }
}