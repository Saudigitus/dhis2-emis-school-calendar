import * as React from 'react';
import { Button } from "@dhis2/ui";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

interface props {
    open: boolean,
    setOpen: (arg: boolean) => void
    row: any
}

export default function AlertDialog(props: props) {
    const { open, setOpen, row } = props

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setOpen(false)
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
