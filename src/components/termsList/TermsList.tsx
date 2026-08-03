import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Accordion, AccordionSummary, IconButton, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import GridViewComponentTerm from '../table/gridView/GridViewComponentTerm';
import NewSchoolTerm from '../modal/newTerm/ModalAddNewTerm';
import { SchoolCalendarData } from 'dhis2-semis-components';
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement';
import { GeneralLoadingState } from '../../schema/loadingSchema';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../offDaysList/OffDaysList.module.css'
import { IconAddCircle24 } from '@dhis2/ui';
import { editState } from '../../schema/editDataSchema';
import NewOdffDay from '../modal/newOffDay/modalAddNewOffDay';

function TermsList({ i18next }: { i18next: D2I18n }) {
    const i18nLocal = i18next
    const { id } = useParams();
    const { posting } = dataStoreManagement()
    const data = useRecoilValue(SchoolCalendarData)
    const loading = useRecoilValue(GeneralLoadingState)
    const [expanded, setExpanded] = useState("")
    const [selected, setSelected] = useRecoilState(editState)

    return (
        <div>
            <div className={styles.titleContainer} >
                <h6 style={{ marginTop: "8px", color: "#2C6693" }} >{i18nLocal.t("School Terms")}</h6>
                <IconButton onClick={() => {
                    if (expanded == 'panel2d') {
                        setExpanded("");
                    } else {
                        setExpanded("panel2d");
                    }
                }} className={styles.icon}>
                    <IconAddCircle24 />
                </IconButton>
            </div>

            <Accordion style={{ padding: "-10px 0 0 0" }} elevation={0} expanded={(expanded == 'panel2d' || selected?.edit) ?? false} >
                <AccordionSummary style={{ display: "none" }} />
                <NewSchoolTerm i18next={i18next} setOpen={setExpanded} />
            </Accordion>
            <div>
                {(loading || posting) && <LinearProgress />}
                <>
                    {
                        data?.schoolCalendar?.find((x: any) => x.id === id)?.classPeriods?.length ?

                            <GridViewComponentTerm
                                i18next={i18nLocal}
                                classPeriods={data?.schoolCalendar?.find((x: any) => x.id === id)?.classPeriods || []}
                            />
                            :
                            <>{i18nLocal.t("No school term registered yet")}.</>
                    }
                </>
            </div>
        </div>
    )
}

export default TermsList