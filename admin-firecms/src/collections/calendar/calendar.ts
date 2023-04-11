import {
        buildCollection,
        EnumValueConfig
    } from "ppramesi-firecms";
import { Calendar, statusTypes } from "@/types";

export const calendarCollection = buildCollection<Calendar>({
    name: "Calendar",
    path: "calendar",
    properties: {
        event_id: {
            name: "Event",
            dataType: "reference"
        },
        end_date: {
            name: "End Date",
            dataType: "date"
        },
        start_date: {
            name: "Start Date",
            dataType: "date"
        },
        event: {
            dataType: "map",
            properties: {
                location: {
                    dataType: "string"
                },
                status: {
                    dataType: "array",
                    of: {
                        dataType: "string",
                        enumValues: statusTypes
                    }
                }
            }
        }          
    }
})