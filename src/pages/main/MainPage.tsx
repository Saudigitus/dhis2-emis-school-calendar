import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SchoolCalendarData } from "dhis2-semis-components";
import { useDataStore } from "../../hooks/appwarapper/useDataStore";
import YearCalendarView from "../../components/calendar/YearCalendarView";
import SidebarPanel from "../../components/sidebar/SidebarPanel";
import styles from "./main.module.css";
import type { D2I18n } from "dhis2-semis-types";
import { SelectedTermAtom } from "../../schema/selectedTerm";

function MainPage({ i18next }: { i18next: D2I18n }) {
    const { id } = useParams();
    const { loading } = useDataStore();
    const dataStoreData = useRecoilValue(SchoolCalendarData);
    const selectedTerm = useRecoilValue(SelectedTermAtom);

    const currentCalendar = dataStoreData?.schoolCalendar?.find(
        (x: any) => x.id === id
    );

    const year = currentCalendar?.academicYear?.startDate
        ? new Date(currentCalendar.academicYear.startDate).getFullYear()
        : new Date().getFullYear();

    const startMonth = currentCalendar?.academicYear?.startDate
        ? new Date(currentCalendar.academicYear.startDate).getMonth()
        : new Date().getMonth();

    const classPeriods = currentCalendar?.classPeriods || [];
    const holidays = currentCalendar?.holidays || [];

    const yearLabel = currentCalendar?.academicYear?.label || `${year}`;

    console.log(currentCalendar)
    return (
        <div className={styles.mainPage}>
            <div className={styles.topBar}>
                <h1 className={styles.yearTitle}>
                    {yearLabel} {i18next.t("School Calendar")}
                </h1>
            </div>

            <div className={styles.contentArea}>
                <div className={styles.calendarArea}>
                    {loading ? (
                        <div className={styles.loading}>{i18next.t("Loading...")}</div>
                    ) : (
                        <YearCalendarView
                            startMonth={startMonth}
                            year={year}
                            classPeriods={classPeriods}
                            holidays={holidays}
                            selectedTerm={selectedTerm}
                        />
                    )}
                </div>
                <SidebarPanel
                    i18n={i18next}
                    classPeriods={classPeriods}
                />
            </div>
        </div>
    );
}

export default MainPage;
