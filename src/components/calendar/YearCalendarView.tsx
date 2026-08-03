import React from "react";
import MonthGrid from "./MonthGrid";
import styles from "./YearCalendarView.module.css";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";

interface YearCalendarViewProps {
    year: number;
    classPeriods: schoolCalendar["classPeriods"];
    holidays: schoolCalendar["holidays"];
    selectedTerm?: string;
    startMonth: number;
}

export default function YearCalendarView({ year, classPeriods, holidays, selectedTerm, startMonth }: YearCalendarViewProps) {
    const MONTHS = [];
    MONTHS.push(...Array.from({ length: 12 }, (_, i) => (startMonth + i) % 12));

    // if year begin from >0 pass trougth 0 to > 0 add more 1 Year = year+1 
    let newYearPosition;

    if (MONTHS.includes(0) && MONTHS.indexOf(0) > 0) {
        newYearPosition = MONTHS.indexOf(0);
    }

    return (
        <div className={styles.yearCalendar}>
            <div className={styles.monthsGrid}>
                {MONTHS.map((month, index) => (
                    <MonthGrid
                        key={month}
                        year={index >= newYearPosition ? year + 1 : year}
                        month={month}
                        classPeriods={classPeriods}
                        holidays={holidays}
                        selectedTerm={selectedTerm}
                    />
                ))}
            </div>
        </div>
    );
}
