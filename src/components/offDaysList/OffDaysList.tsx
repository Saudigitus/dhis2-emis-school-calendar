import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import GridViewComponent from '../table/gridView/GridViewComponent';
import { WithPadding } from "../template";
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { editState } from '../../schema/editDataSchema';
import ModalComponent from "../modal/modal";
import NewOdffDay from '../modal/newOffDay/modalAddNewOffDay';
import { SchoolCalendarData } from 'dhis2-semis-components';

function OffDaysList() {
    const [open, setOpen] = useState(false)
    const data = useRecoilValue(SchoolCalendarData)
    const { id } = useParams();
    const setSelected = useSetRecoilState(editState)

    function onClose() {
        setOpen(false);
        setSelected({ edit: false, data: Object() });
    }

    return (
        <div>
            <ModalComponent onClose={onClose} open={open} title={'Non School Day Register'} children={<NewOdffDay setOpen={setOpen} />} />
            <WithPadding padding='10px'>
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
            <WithPadding>
                <div>
                    {/* {loading ? <CenteredContent className="p-4">
                        <CircularLoader />
                    </CenteredContent>
                        :  */}
                        <WithPadding>
                            <GridViewComponent setOpen={setOpen} offDays={data?.schoolCalendar?.find((x) => x.id === id)?.holidays || []} />
                        </WithPadding>
                    
                </div>
            </WithPadding>
        </div>
    )
}

export default OffDaysList
