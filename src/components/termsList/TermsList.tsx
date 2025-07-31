import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { WithPadding } from "../template";
import { Button, LinearProgress } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import ModalComponent from "../modal/modal";
import { useParams } from 'react-router-dom';
import GridViewComponentTerm from '../table/gridView/GridViewComponentTerm';
import NewSchoolTerm from '../modal/newTerm/ModalAddNewTerm';
import { SchoolCalendarData } from 'dhis2-semis-components';
import { useDataStore } from '../../hooks/appwarapper/useDataStore';
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement';
import { GeneralLoadingState } from '../../schema/loadingSchema';

function TermsList() {
    const { id } = useParams();
    // const { loading } = useDataStore()
    const { posting } = dataStoreManagement()
    const [open, setOpen] = useState(false)
    const data = useRecoilValue(SchoolCalendarData)

    const [loading, setLoading] = useRecoilState(GeneralLoadingState)

    return (
        <div>
            <ModalComponent onClose={() => setOpen(false)} open={open} title={'Non School Day Register'} children={<NewSchoolTerm setOpen={setOpen} />} />
            <WithPadding padding='10px'>
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Add School Term
                </Button>
            </WithPadding>
            <WithPadding>
                <div>
                    {(loading || posting) && <LinearProgress />}
                    <WithPadding>
                        {
                            data?.schoolCalendar?.find((x) => x.id === id)?.classPeriods?.length ?

                                <GridViewComponentTerm
                                    setOpen={setOpen}
                                    classPeriods={data?.schoolCalendar?.find((x) => x.id === id)?.classPeriods || []}
                                />
                                :
                                <>No school terms registered yet.</>
                        }
                    </WithPadding>
                </div>
            </WithPadding>
        </div>
    )
}

export default TermsList