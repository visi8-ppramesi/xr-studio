import {
    buildCollection, EntityReference
} from "@camberi/firecms";

type status_item = {
    date: Date,
    note: string, 
    processed_by: null,
    status: string
}
 
type submissionForms = {
    asset: EntityReference,
    current_status: string[],
    description: string,
    preview_urls: string,
    status_history: status_item[],
    submission_date: Date,
    updated_date: Date,
    user: EntityReference,
}

export const submissionFormsCollection = buildCollection<submissionForms>({
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