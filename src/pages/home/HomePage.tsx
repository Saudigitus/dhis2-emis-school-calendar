import React from 'react'
import { DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell, TableFoot } from "@dhis2/ui";
import { Container } from 'react-bootstrap';
import { More, MoreVert, AddCircleOutline } from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';

function HomePage() {
    return (
        <Container className="mt-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className="mb-2">School Calendar</h4>

                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    className="mb-2"
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
                    <DataTableRow>
                        <DataTableCell ali>Student</DataTableCell>
                        <DataTableCell>2025</DataTableCell>
                        <DataTableCell>2025-2026</DataTableCell>
                        <DataTableCell>2025-2026</DataTableCell>
                        <DataTableCell>01/01/2025</DataTableCell>
                        <DataTableCell>31/12/2025</DataTableCell>
                        <DataTableCell><IconButton><MoreVert /></IconButton></DataTableCell>
                    </DataTableRow>
                    <DataTableRow>
                        <DataTableCell>Staff</DataTableCell>
                        <DataTableCell>2025</DataTableCell>
                        <DataTableCell>2025-2026</DataTableCell>
                        <DataTableCell>2025-2026</DataTableCell>
                        <DataTableCell>01/01/2025</DataTableCell>
                        <DataTableCell>31/12/2025</DataTableCell>
                        <DataTableCell><IconButton><MoreVert /></IconButton></DataTableCell>
                    </DataTableRow>
                    <DataTableRow>
                        <DataTableCell>Student</DataTableCell>
                        <DataTableCell>2024</DataTableCell>
                        <DataTableCell>2024-2025</DataTableCell>
                        <DataTableCell>2024-2025</DataTableCell>
                        <DataTableCell>01/01/2024</DataTableCell>
                        <DataTableCell>31/12/2024</DataTableCell>
                        <DataTableCell><IconButton><MoreVert /></IconButton></DataTableCell>
                    </DataTableRow>
                </TableBody>
            </DataTable>
        </Container>
    )
}

export default HomePage