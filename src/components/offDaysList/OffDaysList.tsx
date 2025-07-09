import React, { useState } from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import GridViewComponent from '../table/gridView/GridViewComponent';
import { WithPadding } from "../template";
import Button from '@material-ui/core/Button';
import { ArrowBack, AddCircleOutline } from '@material-ui/icons';
import NewOdffDay from "../modal/newOffDay/modalAddNewOffDay";
import ModalComponent from "../modal/modal";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { useDataStore } from "../../hooks/appwarapper/useDataStore";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    const { loading } = useDataStore()
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ overflow: "hidden" }}>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ModalComponent setOpen={setOpen} open={open} title={'Non School Day Register'} children={<NewOdffDay setOpen={setOpen} />} />
            <WithPadding padding='10px'>
                <div className={classes.topOfTheTable}>

                    <Button
                        variant="outlined"
                           className={classes.button}
                        startIcon={< ArrowBack />}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back to list
                    </Button>

                    <Button
                        variant="outlined"
                        className={classes.button}
                        startIcon={<AddCircleOutline />}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        New Off Day
                    </Button>
                </div>
            </WithPadding>
            <WithPadding>
                {/* <h5 className='mt-2'>Non School Days</h5> */}
                <div
                    className={classes.tableContainer}
                >
                    {loading ? <CenteredContent className="p-4">
                        <CircularLoader />
                    </CenteredContent>
                        : <WithPadding>
                            <GridViewComponent setOpen={setOpen} offDays={data?.find((x) => x.id === id)?.holidays || []} />
                        </WithPadding>
                    }
                </div>
            </WithPadding>
        </div>
    )
}

export default OffDaysList
