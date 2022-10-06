import Subcollection from "../../../core/subcollection";

export default class extends Subcollection{
    static collection = 'contract_versions'
    static parentCollection = 'contracts'
    static orderByParam = 'name'
    static fields = {
        contract_text: String,
        version: Number,
        file_urls: Array,
        status: Object,
        previous_hash: String,
        current_hash: String,
        signatures: Array
    }
}