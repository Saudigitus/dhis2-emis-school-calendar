import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import GridViewComponent from '../table/gridView/GridViewComponent';
import { Accordion, AccordionSummary, IconButton, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { editState } from '../../schema/editDataSchema';
import NewOdffDay from '../modal/newOffDay/modalAddNewOffDay';
import { SchoolCalendarData } from 'dhis2-semis-components';
import { useDataStore } from '../../hooks/appwarapper/useDataStore';
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement';
import { D2I18n } from 'dhis2-semis-types';
import { IconAddCircle24 } from '@dhis2/ui';
import styles from './OffDaysList.module.css'

function OffDaysList({ i18next }: { i18next: D2I18n }) {
    const i18nLocal = i18next
    const { id } = useParams();
    const { loading } = useDataStore()
    const { posting } = dataStoreManagement()
    const data = useRecoilValue(SchoolCalendarData)
    const [expanded, setExpanded] = useState("")
    const [selected, setSelected] = useRecoilState(editState)
    const isExpanded = Boolean(expanded === "panel1d" || selected?.edit);

    return (
        <div>
            <div className={styles.titleContainer} >
                <h6 style={{ marginTop: "8px", color: "#2C6693" }} >{i18nLocal.t("Off days")}</h6>
                <IconButton onClick={() => {
                    if (expanded == 'panel1d') {
                        setExpanded("");
                    } else {
                        setExpanded("panel1d");
                    }
                }} className={styles.icon}>
                    <IconAddCircle24 />
                </IconButton>
            </div>

            <Accordion style={{ padding: "-10px 0 0 0" }} elevation={0} expanded={isExpanded} >
                <AccordionSummary style={{ display: "none" }} />
                <NewOdffDay i18next={i18next} setOpen={setExpanded} />
            </Accordion>

            <div>
                {(loading || posting) && <LinearProgress />}
                {
                    data?.schoolCalendar?.find((x: any) => x.id === id)?.holidays?.length ?
                        <>
                            <GridViewComponent i18n={i18nLocal} offDays={data?.schoolCalendar?.find((x: any) => x.id === id)?.holidays || []} />
                        </>
                        :
                        <>{i18nLocal.t("No off day registered yet")}.</>
                }
            </div>
        </div>
    )
}
export default OffDaysList
