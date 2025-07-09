import React, { useState } from 'react'
import { DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell, TableFoot } from "@dhis2/ui";
import { Container } from 'react-bootstrap';
import { MoreVert, AddCircleOutline } from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';
import { useDataStore } from '../../hooks/appwarapper/useDataStore';
import AddNewSchoolCalendar from '../../components/modal/newSchoolCalendar/AddNewSchoolCalendar';
import ModalComponent from '../../components/modal/modal';

function HomePage() {
    const navigate = useNavigate()
    const data = useRecoilValue(DataStoreState)
    const [open, setOpen] = useState(false)
    const { loading } = useDataStore()

    if (loading) {
        return (
            <CenteredContent className="p-4">
                <CircularLoader />
            </CenteredContent>
        )
    }

    // navigate to the main page when a row is clicked
    const handleRowClick = (id: string) => {
        navigate(`/main/${id}`)
    }
    console.log(data)
    return (
        <Container className="mt-5">
            <ModalComponent setOpen={setOpen} open={open} title={'Add new school calendar'} children={<AddNewSchoolCalendar setOpen={setOpen} />} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className="mb-2">School Calendar</h4>

                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    className="mb-2"
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    New School Calendar
                </Button>
            </div>
            <DataTable>
                <TableHead>
                    <DataTableRow>
                        <DataTableColumnHeader>Type</DataTableColumnHeader>
                        <DataTableColumnHeader>Academic Year</DataTableColumnHeader>
                        <DataTableColumnHeader>Description</DataTableColumnHeader>
                        <DataTableColumnHeader>Label</DataTableColumnHeader>
                        <DataTableColumnHeader>Start Date</DataTableColumnHeader>
                        <DataTableColumnHeader>End Date</DataTableColumnHeader>
                        <DataTableColumnHeader>Actions</DataTableColumnHeader>
                    </DataTableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item, index) => (
                            <DataTableRow onClick={() => handleRowClick(item.id)} key={index}>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.type}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.code}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.description}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.label}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.startDate}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}>{item.academicYear?.endDate}</DataTableCell>
                                <DataTableCell onClick={() => handleRowClick(item.id)}><IconButton><MoreVert /></IconButton></DataTableCell>
                            </DataTableRow>
                        ))
                    }
                </TableBody>
            </DataTable>
        </Container>
    )
}

export default HomePage