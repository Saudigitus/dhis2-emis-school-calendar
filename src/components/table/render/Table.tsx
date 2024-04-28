import React, {useState, useEffect} from 'react'
import {CenteredContent, CircularLoader} from "@dhis2/ui";
import {HeaderFilters} from '../components'
import {makeStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
import WithBorder from '../../template/withBorder';
import {useHeader} from '../../../hooks/tableHeader/useHeader';
import {useTableData} from '../../../hooks/tableData/useTableData';
import Pagination from '../components/pagination/Pagination';
import {useRecoilState, useRecoilValue} from 'recoil';
import GridViewComponent from '../components/gridView/GridViewComponent';
import {WithPadding} from "../../template";
import {LoadOffDays} from "../../../schema/loadSchema";
import {offDaysViewState} from "../../../schema/offDaysViewSchema";
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
    const {columns} = useHeader()
    const [page, setpage] = useState(1)
    const {tableData} = useTableData()
    const [copy, setCopy] = useState<any[]>([])
    const [pageSize, setpageSize] = useState(10)
    const [loading,] = useRecoilState(LoadOffDays);
    const [dataToShow, setDataToShow] = useState<any[]>([])
    // const [filterContent,] = useRecoilState(TableFilterState);
    const templatesViewMode = useRecoilValue(offDaysViewState)
    // const { filterData } = filter({ setCopy, tableData, filterContent })

    useEffect(() => {
        if (copy.length > 0) setDataToShow(copy?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize))
        else setDataToShow([])
    }, [page, copy])

    // useEffect(() => {
    //     filterData()
    // }, [filterContent])

    useEffect(() => {
        setCopy(tableData)
    }, [tableData])

    const onPageChange = (newPage: number) => setpage(newPage)

    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }

    return (
        <Paper style={{overflow: "hidden"}}>
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
            <WithBorder type='bottom'/>
            <WithPadding>
                <WithBorder type='all'>
                    <HeaderFilters/>
                    <div
                        className={classes.tableContainer}
                    >
                        <WithPadding>
                            {!loading && <GridViewComponent offDays={tableData}/>}
                        </WithPadding>
                        {loading &&
                            <CenteredContent className="p-4">
                                <CircularLoader/>
                            </CenteredContent>
                        }
                    </div>
                    <Pagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        page={page}
                        rowsPerPage={pageSize}
                        totalPerPage={dataToShow?.length}
                    />
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
