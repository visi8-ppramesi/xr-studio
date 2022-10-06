import Collection from "../../core/collection";
import { ExternalURL } from "../../core/types";

export default class extends Collection{
    static collection = 'contracts_templates'
    static orderByParam = 'name'
    static fields = {
        name: String,
        contract_text: String,
        contract_file_url: ExternalURL,
    }
}