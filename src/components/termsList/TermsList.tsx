import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { WithPadding } from "../template";
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import ModalComponent from "../modal/modal";
import { useParams } from 'react-router-dom';
import GridViewComponentTerm from '../table/gridView/GridViewComponentTerm';
import NewSchoolTerm from '../modal/newTerm/ModalAddNewTerm';
import { SchoolCalendarData } from 'dhis2-semis-components';

function TermsList() {
    const [open, setOpen] = useState(false)
    const data = useRecoilValue(SchoolCalendarData)
    const { id } = useParams();

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
                    Add Academic Year
                </Button>
            </WithPadding>
            <WithPadding>
                <div>
                    {/* {loading ? <CenteredContent className="p-4">
                        <CircularLoader />
                    </CenteredContent>
                        : */}
                         <WithPadding>
                            <GridViewComponentTerm
                                setOpen={setOpen}
                                classPeriods={data?.schoolCalendar?.find((x) => x.id === id)?.classPeriods || []}
                            />
                        </WithPadding>
                    {/* } */}
                </div>
            </WithPadding>
        </div>
    )
}

export default TermsList
