import Collection from "../../core/collection";
import { Flex } from "../../core/types";

export default class extends Collection{
    static collection = 'settings'
    static fields = {
        value: new Flex([String, Array, Object])
    }
}