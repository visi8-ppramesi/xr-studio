import React from "react";
import { Box, Button } from "@mui/material";
import { Entity, EntityValues, useSnackbarController } from "ppramesi-firecms";
import { Test } from "../types";

export function SampleTestsView() {
    const values = {test:"test"}
    return (
        <Box
            display="flex"
            width={"100%"}
            height={"100%"}>

            <Box m="auto"
                 display="flex"
                 flexDirection={"column"}
                 alignItems={"center"}
                 justifyItems={"center"}>

                <Box p={4}>
                    <p>
                        This is an example of a custom view added
                        as a panel to an entity collection.
                    </p>
                    <p>
                        Values in the form:
                    </p>

                    {values && <p style={{
                        color: "#fff",
                        padding: "8px",
                        fontSize: ".85em",
                        fontFamily: "monospace",
                        borderRadius: "4px",
                        backgroundColor: "#4e482f"
                    }}>
                        {JSON.stringify(values, null, 2)}
                    </p>}

                </Box>
            </Box>
        </Box>
    );

}
