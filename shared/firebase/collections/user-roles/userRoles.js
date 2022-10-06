import Collection from "../../core/collection";

export default class extends Collection{
    static collection = "user_roles"
    static fields = {
        user: Collection.resolve('../../users/users'),
        types: Array
    }
}