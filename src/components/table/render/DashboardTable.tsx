import React from 'react'
import { TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import { makeStyles } from '@material-ui/core';
import RenderRowsDashboard from './RenderRowsDashboard';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    }
});

interface DashboardTableProps {
    columns: any
    tableData: any
    setactiveEvent: any
    activeEvent: string
}

function DashboardTable(props: DashboardTableProps) {
    const classes = usetStyles()
    const { columns, tableData, setactiveEvent, activeEvent } = props

    return (
        <div
            className={classes.tableContainer}
        >
            <TableComponent>
                <>
                    <RenderHeader
                        createSortHandler={() => { }}
                        order='asc'
                        orderBy='desc'
                        rowsHeader={columns}
                    />
                    <RenderRowsDashboard
                        headerData={columns}
                        rowsData={tableData}
                        setactiveEvent={setactiveEvent}
                        activeEvent={activeEvent}
                    />
                </>
            </TableComponent>
        </div>
    )
}

export default DashboardTable