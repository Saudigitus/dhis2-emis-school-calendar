import React, { useState, ReactElement, useEffect } from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { HeaderFilters, TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import RenderRows from './RenderRows'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/withBorder';
import { useHeader } from '../../../hooks/tableHeader/useHeader';
import { useTableData } from '../../../hooks/tableData/useTableData';
import Pagination from '../components/pagination/Pagination';
import { useRecoilState, useRecoilValue } from 'recoil';
import GridViewComponent from '../components/gridView/GridViewComponent';
import {WithPadding} from "../../template";
import {LoadOffDays} from "../../../schema/loadSchema";
import {offDaysViewState} from "../../../schema/offDaysViewSchema";

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()
    const [page, setpage] = useState(1)
    const { tableData } = useTableData()
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
        <Paper style={{ overflow: "hidden" }} >
            {/*<WithPadding padding='10px'>*/}
            {/*    <div className='row d-flex align-items-center justify-content-between'>*/}
            {/*        <h5 className='m-0'>{tableTitle}</h5>*/}
            {/*        {tableAction ?? null}*/}
            {/*    </div>*/}
            {/*</WithPadding>*/}
            <WithBorder type='bottom' />
            <WithPadding >
                <WithBorder type='all' >
                    <HeaderFilters />
                    <div
                        className={classes.tableContainer}
                    >
                        {templatesViewMode === "list" ?
                            <TableComponent>
                                <>
                                    <RenderHeader
                                        createSortHandler={() => { }}
                                        order='asc'
                                        orderBy='desc'
                                        rowsHeader={columns}
                                    />
                                    {!loading &&
                                        <RenderRows
                                            headerData={columns}
                                            rowsData={dataToShow}
                                        />
                                    }
                                </>
                            </TableComponent>
                            :
                            <WithPadding>
                                {!loading && <GridViewComponent offDays={tableData} />}
                            </WithPadding>
                        }
                        {loading &&
                            <CenteredContent className="p-4">
                                <CircularLoader />
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
