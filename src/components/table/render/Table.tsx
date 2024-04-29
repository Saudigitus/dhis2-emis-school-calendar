import React from 'react'
import {CenteredContent, CircularLoader} from "@dhis2/ui";
import {makeStyles} from '@material-ui/core/styles';
import {useTableData} from '../../../hooks/tableData/useTableData';
import {useRecoilState} from 'recoil';
import GridViewComponent from '../gridView/GridViewComponent';
import {WithPadding} from "../../template";
import {LoadOffDays} from "../../../schema/loadSchema";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// @ts-ignore
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

function Table() {
    const classes = useStyles()
    const {tableData} = useTableData()
    const [loading] = useRecoilState(LoadOffDays);

    return (
        <div style={{overflow: "hidden"}}>
            <WithPadding padding='10px'>
                <div className={classes.topOfTheTable}>
                    <h5>Non School Days</h5>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        startIcon={<AddCircleOutlineIcon/>}
                    >
                        New Off Day
                    </Button>
                </div>
            </WithPadding>
            <WithPadding>
                <div
                    className={classes.tableContainer}
                >
                    {loading
                        ? <CenteredContent className="p-4">
                            <CircularLoader/>
                        </CenteredContent>
                        : <WithPadding>
                            {!loading && <GridViewComponent offDays={tableData}/>}
                        </WithPadding>
                    }
                </div>
            </WithPadding>
        </div>
    )
}

export default Table
