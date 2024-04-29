import React, {useState} from 'react'
import {CenteredContent, CircularLoader} from "@dhis2/ui";
import {makeStyles} from '@material-ui/core/styles';
import {useRecoilState, useRecoilValue} from 'recoil';
import GridViewComponent from './gridView/GridViewComponent';
import {WithPadding} from "../template";
import {LoadState} from "../../schema/loadSchema";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NewOdffDay from "../modal/newOffDay/modalAddNewOffDay";
import ModalComponent from "../modal/modal";
import {DataStoreState} from "../../schema/dataStoreSchema";
import {useDataStore} from "../../hooks/appwarapper/useDataStore";

// @ts-expect-error
const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "Capitalize"
    },
    tableContainer: {
        overflowX: 'auto'
    },
    topOfTheTable: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    }
}));

function OffDaysList() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const data = useRecoilValue(DataStoreState)
    const {loading} = useDataStore()

    return (
        <div style={{overflow: "hidden"}}>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ModalComponent setOpen={setOpen} open={open} title={'Non School Day Register'}
                            children={<NewOdffDay setOpen={setOpen}/>}/>
            <WithPadding padding='10px'>
                <div className={classes.topOfTheTable}>
                    <h5>Non School Days</h5>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        startIcon={<AddCircleOutlineIcon/>}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        New Off Day
                    </Button>
                </div>
            </WithPadding>
            <WithPadding>
                <div
                    className={classes.tableContainer}
                >
                    {loading ? <CenteredContent className="p-4">
                            <CircularLoader/>
                        </CenteredContent>
                        : <WithPadding>
                            <GridViewComponent offDays={data.holidays}/>
                        </WithPadding>
                    }
                </div>
            </WithPadding>
        </div>
    )
}

export default OffDaysList
