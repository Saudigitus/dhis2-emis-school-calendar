import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SchoolCalendarData } from "dhis2-semis-components";
import { useDataStore } from "../../hooks/appwarapper/useDataStore";
import YearCalendarView from "../../components/calendar/YearCalendarView";
import SidebarPanel from "../../components/sidebar/SidebarPanel";
import styles from "./main.module.css";
import type { D2I18n } from "dhis2-semis-types";

function MainPage({ i18next }: { i18next: D2I18n }) {
    const { id } = useParams();
    const { loading } = useDataStore();
    const dataStoreData = useRecoilValue(SchoolCalendarData);
    const [selectedOption, setSelectedOption] = useState<string>("non-school-days");

    const currentCalendar = dataStoreData?.schoolCalendar?.find(
        (x: any) => x.id === id
    );

    const year = currentCalendar?.academicYear?.startDate
        ? new Date(currentCalendar.academicYear.startDate).getFullYear()
        : new Date().getFullYear();

    const classPeriods = currentCalendar?.classPeriods || [];
    const holidays = currentCalendar?.holidays || [];

    const yearLabel = currentCalendar?.academicYear?.label || `${year}`;
    const termLabels = classPeriods?.map((p: any) => p.description) || [];

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
                            year={year}
                            classPeriods={classPeriods}
                            holidays={holidays}
                            selectedTerm={selectedOption}
                        />
                    )}
                </div>
                <SidebarPanel
                    i18n={i18next}
                    classPeriods={classPeriods}
                    initialSelected={selectedOption}
                    onSelectedChange={setSelectedOption}
                />
            </div>
        </div>
    );
}

export default MainPage;
