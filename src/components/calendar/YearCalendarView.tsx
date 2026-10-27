import React from "react";
import MonthGrid from "./MonthGrid";
import styles from "./YearCalendarView.module.css";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";
import type { D2I18n } from "dhis2-semis-types";

interface YearCalendarViewProps {
    year: number;
    classPeriods: schoolCalendar["classPeriods"];
    holidays: schoolCalendar["holidays"];
    selectedTerm?: string;
    startMonth: number;
    i18n: D2I18n;
    weekDays?: schoolCalendar["weekDays"];
}

export default function YearCalendarView({ year, classPeriods, holidays, selectedTerm, startMonth, i18n, weekDays }: YearCalendarViewProps) {
    const MONTHS = [];
    MONTHS.push(...Array.from({ length: 12 }, (_, i) => (startMonth + i) % 12));

    // if year begin from >0 pass trougth 0 to > 0 add more 1 Year = year+1 
    let newYearPosition;

    if (MONTHS.includes(0) && MONTHS.indexOf(0) > 0) {
        newYearPosition = MONTHS.indexOf(0);
    }

    return (
        <div className={styles.yearCalendar}>
            <div className={styles.legend}>
                <span className={styles.legendItem}>
                    <span className={styles.legendSwatch} style={{ background: "linear-gradient(90deg, #E3F2E9 33%, #D6E8F7 33% 66%, #FFF3D6 66%)" }} />
                    {i18n.t("Term days")}
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendSwatch} style={{ background: "#FFE5E5" }} />
                    {i18n.t("Non-school days")}
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendSwatch} style={{ background: "#ffffff", color: "#b0b7c3" }}>01</span>
                    {i18n.t("Week days without school")}
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} />
                    {i18n.t("Term start or end")}
                </span>
            </div>
            <div className={styles.monthsGrid}>
                {MONTHS.map((month, index) => (
                    <MonthGrid
                        key={month}
                        year={index >= newYearPosition ? year + 1 : year}
                        month={month}
                        classPeriods={classPeriods}
                        holidays={holidays}
                        selectedTerm={selectedTerm}
                        i18n={i18n}
                        weekDays={weekDays}
                    />
                ))}
            </div>
        </div>
    );
}
