import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import GridViewComponent from '../table/gridView/GridViewComponent';
import { WithPadding } from "../template";
import { Button, IconButton, LinearProgress } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { editState } from '../../schema/editDataSchema';
import ModalComponent from "../modal/modal";
import NewOdffDay from '../modal/newOffDay/modalAddNewOffDay';
import { SchoolCalendarData } from 'dhis2-semis-components';
import { useDataStore } from '../../hooks/appwarapper/useDataStore';
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement';
import { D2I18n } from 'dhis2-semis-types';
import { Subtitle } from '../text';
import { IconAddCircle24 } from '@dhis2/ui';
import styles from './OffDaysList.module.css'

function OffDaysList({ i18next }: { i18next: D2I18n }) {
    const i18nLocal = i18next
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
            <ModalComponent onClose={onClose} open={open} title={i18nLocal.t('Non School Day Register')} children={<NewOdffDay i18next={i18next} setOpen={setOpen} />} />
            <div className={styles.titleContainer} >
                <Subtitle color="#2C6693" label={"Off days"} />
                <IconButton className={styles.icon}>
                    <IconAddCircle24 />
                </IconButton>
            </div>
            <div>
                {(loading || posting) && <LinearProgress />}
                {
                    data?.schoolCalendar?.find((x: any) => x.id === id)?.holidays?.length ?
                        <WithPadding>
                            <GridViewComponent i18n={i18nLocal} setOpen={setOpen} offDays={data?.schoolCalendar?.find((x: any) => x.id === id)?.holidays || []} />
                        </WithPadding>
                        :
                        <>{i18nLocal.t("No off day registered yet")}.</>
                }
            </div>
        </div>
    )
}
export default OffDaysList
