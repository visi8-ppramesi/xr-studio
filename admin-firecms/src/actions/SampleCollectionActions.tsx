import React from "react";
import { Button } from "@mui/material";
import { SampleTestsView } from "../views/test"
import {
    CollectionActionsProps,
    useSnackbarController,
    useSideEntityController,
    useSideDialogsController
} from "ppramesi-firecms";

export function SampleCollectionActions({ selectionController }: CollectionActionsProps) {

    const sideDialogController = useSideDialogsController();

    const onClick = (event: React.MouseEvent) => {
        const selectedEntities = selectionController?.selectedEntities;
        const count = selectedEntities ? selectedEntities.length : 0;
        sideDialogController.open({
            key: Math.random().toString(36).substring(2),
            component: SampleTestsView()
        })
    };

    return (
        <Button onClick={onClick} color="primary">
            Extra action
        </Button>
    );

}
