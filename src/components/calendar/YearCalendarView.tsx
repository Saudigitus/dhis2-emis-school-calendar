import React from "react";
import MonthGrid from "./MonthGrid";
import styles from "./YearCalendarView.module.css";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";

interface YearCalendarViewProps {
    year: number;
    classPeriods: schoolCalendar["classPeriods"];
    holidays: schoolCalendar["holidays"];
    selectedTerm?: string;
}

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function YearCalendarView({ year, classPeriods, holidays, selectedTerm }: YearCalendarViewProps) {
    return (
        <div className={styles.yearCalendar}>
            <div className={styles.monthsGrid}>
                {MONTHS.map((month) => (
                    <MonthGrid
                        key={month}
                        year={year}
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
