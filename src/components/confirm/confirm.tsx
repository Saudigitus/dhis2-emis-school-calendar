import * as React from 'react';
import { Button, CircularLoader } from "@dhis2/ui";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {type CardSubItemProps} from "../../types/card/CardTypes";

interface AlertDialogProps {
    open: boolean
    setOpen: (arg: boolean) => void
    row: CardSubItemProps
    setDeleted: (arg: boolean) => void
}

export default function AlertDialog(props: AlertDialogProps) {
    const { open, setOpen, row, setDeleted } = props

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
       setDeleted(true)
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: "500px" }}>
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will delete the selected data
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} primary>Disagree</Button>
                        <Button onClick={handleAgree} destructive>Agree</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment >
    );
}
