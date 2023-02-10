import {
    buildCollection, EntityReference
} from "ppramesi-firecms";
import { SubmissionForm } from "@/types";

export const submissionFormsCollection = buildCollection<SubmissionForm>({
    name: "Submission Forms",
    path: "submission_forms",
    customId: true, 
    properties: {
        asset: {
            name: "Asset",
            dataType: "reference",
            path: "assets"
        },
        current_status: {
            name: "Current Status",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        preview_urls: {
            name: "Preview URL",
            dataType: "string",
        },
        status_history: {
            name: "Status History",
            dataType: "array",
            of: {
                dataType: "map",
                properties: {
                    date: {
                        name: "Date",
                        dataType: "date"
                    },
                    note: {
                        name: "Note",
                        dataType: "string"
                    },
                    processed_by: {
                        name: "Processed By",
                        dataType: "string"
                    },
                    status: {
                        name: "Status",
                        dataType: "string"
                    },
                }

            }
        },
        submission_date: {
            name: "Submission Date",
            dataType: 'date'
        },
        updated_date: {
            name: "Updated Date",
            dataType: 'date'
        },
        user: {
            name: "User",
            dataType: "reference",
            path: "users"
        }
    }
})