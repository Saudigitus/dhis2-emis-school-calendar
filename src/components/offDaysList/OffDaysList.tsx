import React, { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import GridViewComponent from '../table/gridView/GridViewComponent';
import { Button, LinearProgress } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { editState } from '../../schema/editDataSchema';
import ModalComponent from "../modal/modal";
import NewOdffDay from '../modal/newOffDay/modalAddNewOffDay';
import { SchoolCalendarData, WithPadding } from 'dhis2-semis-components';
import { useDataStore } from '../../hooks/appwarapper/useDataStore';
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement';

function OffDaysList() {
    const { id } = useParams();
    const { loading } = useDataStore()
    const [open, setOpen] = useState(false)
    const { posting } = dataStoreManagement()
    const data = useRecoilValue(SchoolCalendarData)
    const [selected, setSelected] = useRecoilState(editState)

    function onClose() {
        setOpen(false);
        setSelected({ edit: false, data: Object() });
    }

    return (
        <div>
            <ModalComponent onClose={onClose} open={open} title={'Non School Day Register'} children={<NewOdffDay setOpen={setOpen} />} />
            <WithPadding p='0.5rem 15px'>
                <Button
                    variant="outlined"
                    style={{}}
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    New Off Day
                </Button>
            </WithPadding>
            <WithPadding p='0.5rem 15px'>
                <div>
                    {(loading || posting) && <LinearProgress />}
                    <WithPadding p='0'>
                        {
                            data?.schoolCalendar?.find((x) => x.id === id)?.holidays?.length ?
                                <GridViewComponent
                                    setOpen={setOpen}
                                    offDays={data?.schoolCalendar?.find((x) => x.id === id)?.holidays || []}
                                />
                                :
                                <>No off day registered yet.</>
                        }
                    </WithPadding>
                </div>
            </WithPadding>
        </div>
    )
}

export default OffDaysList