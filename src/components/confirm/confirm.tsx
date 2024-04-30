import * as React from 'react';
import { Button, CircularLoader } from "@dhis2/ui";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {dataStoreManagement} from "../../hooks/dataStore/useDSManagement";
import {useRecoilValue} from "recoil";
import {DataStoreState} from "../../schema/dataStoreSchema";
import {type CardSubItemProps} from "../../types/card/CardTypes";

interface props {
    open: boolean
    setOpen: (arg: boolean) => void
    row: CardSubItemProps
}

export default function AlertDialog(props: props) {
    const { open, setOpen, row } = props
    const { postData, loading} = dataStoreManagement()
    const dataStoreData = useRecoilValue(DataStoreState)

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        let copy = [...dataStoreData.holidays]
        copy.splice(row.index, 1)

        void postData({
            ...dataStoreData,
            holidays: [...copy]
        }).then(() => {
            setOpen(false);
            setOpen(false)
        })
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
                        <Button onClick={handleAgree} destructive icon={loading && <CircularLoader small />}>Agree</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment >
    );
}
