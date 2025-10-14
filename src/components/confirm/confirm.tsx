import * as React from 'react';
import { Button } from "@dhis2/ui";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface AlertDialogProps {
    open: boolean
    setOpen: (arg: boolean) => void
    setAgree: (arg: boolean) => void
}

export default function AlertDialog(props: AlertDialogProps) {
    const { open, setOpen, setAgree } = props

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setAgree(true)
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