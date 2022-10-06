import Collection from "../../core/collection";

export default class extends Collection{
    static collection = 'shoot_keys'
    static fields = {
        encryption_keys: Object
    }
}