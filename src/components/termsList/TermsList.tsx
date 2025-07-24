import React, { useState } from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { useRecoilState, useRecoilValue } from 'recoil';
import { WithPadding } from "../template";
import {Button} from '@mui/material';
import { ArrowBack, AddCircleOutline } from '@mui/icons-material';
import NewOdffDay from "../modal/newOffDay/ModalAddNewOffDay";
import ModalComponent from "../modal/Modal";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { useDataStore } from "../../hooks/appwarapper/useDataStore";
import { useNavigate, useParams } from 'react-router-dom';
import GridViewComponentTerm from '../table/gridView/GridViewComponentTerm';
import NewSchoolTerm from '../modal/newTerm/ModalAddNewTerm';

function TermsList() {
    const [open, setOpen] = useState(false)
    const data = useRecoilValue(DataStoreState)
    const { loading } = useDataStore()
    const { id } = useParams();

    return (
        <div>
            <ModalComponent setOpen={setOpen} open={open} title={'Non School Day Register'} children={<NewSchoolTerm setOpen={setOpen} />} />
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
                    {loading ? <CenteredContent className="p-4">
                        <CircularLoader />
                    </CenteredContent>
                        : <WithPadding>
                            <GridViewComponentTerm
                                setOpen={setOpen}
                                classPeriods={data?.schoolCalendar?.find((x) => x.id === id)?.classPeriods || []}
                            />
                        </WithPadding>
                    }
                </div>
            </WithPadding>
        </div>
    )
}

export default TermsList
