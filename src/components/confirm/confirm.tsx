import * as React from 'react';
import { Button } from "@dhis2/ui";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { D2I18n } from 'dhis2-semis-types';

interface AlertDialogProps {
    open: boolean
    setOpen: (arg: boolean) => void
    setAgree: (arg: boolean) => void,
    i18n: D2I18n
}

export default function AlertDialog(props: AlertDialogProps) {
    const { open, setOpen, setAgree, i18n } = props

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
                        {i18n.t("Are you sure?")}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {i18n.t("This will delete the selected data")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} primary>{i18n.t("Disagree")}</Button>
                        <Button onClick={handleAgree} destructive>{i18n.t("Agree")}</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment >
    );
}