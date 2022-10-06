import Collection from "../../core/collection";
import { Flex } from "../../core/types";

export default class extends Collection{
    static collection = 'payments'
    static orderByParam = 'name'
    static fields = {
        sender: Collection.resolve('../users/users'),
        receiver: Collection.resolve('../users/users'),
        created_date: Date,
        for: new  Flex([
            Collection.resolve('../orders/orders'),
            Collection.resolve('../shoots/shoots'),
            null
        ]),
        description: String,
        amount: Number,
        tax: Number,
        total: Number,
        status: String,
        contracts: Collection.resolve('../contracts/contracts'),
        signatures: String
    }
}