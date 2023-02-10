import {
    buildCollection,
} from "ppramesi-firecms";
import { ContractTemplates } from "@/types";


export const contractTemplatesCollection = buildCollection<ContractTemplates>({
    name: "Contract Templates",
    path: "contract_templates",
    customId: true,
    properties: {
        name: {
            name: "Name",
            dataType: "string"
        },
        contract_text: {
            name: "Contract Text",
            dataType: "string"
        },
        contract_file_url: {
            name: "Contract File Url",
            dataType: "string",
            storage: {
                storagePath: "contract_templates",
                acceptedFiles: [
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document/*",
                    "application/msword",
                    "text/plain"
                ],
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return Math.random().toString(36).substring(2) + context.file.name;
                }
            }
        },
        contract_data_fields: {
            name: "Contract Data Fields",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
    }
})