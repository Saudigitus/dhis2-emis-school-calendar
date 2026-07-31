import React from "react";
import styles from "./MonthGrid.module.css";
import {
    getCategoryForDate,
    getCategoryBgColor,
    getCategoryTextColor,
    getCategoryDotColor,
    isClassStartDate,
    type DayCategory,
    isClassEndDate,
} from "../../utils/common/getTermColor";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";
import type { SidebarOption } from "../sidebar/SidebarDropdown";

interface MonthGridProps {
    year: number;
    month: number;
    classPeriods: schoolCalendar["classPeriods"];
    holidays: schoolCalendar["holidays"];
    selectedTerm?: SidebarOption;
}

const WEEKDAY_HEADERS = ["M", "T", "W", "T", "F", "S", "S"];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
}

function formatDate(year: number, month: number, day: number): string {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
}

function getTermIndexFromSelected(selected?: SidebarOption): number | undefined {
    if (selected === "term-1") return 0;
    if (selected === "term-2") return 1;
    if (selected === "term-3") return 2;
    return undefined;
}

function getSelectedTermClassPeriod(
    classPeriods: schoolCalendar["classPeriods"],
    selectedTerm?: SidebarOption
): any {
    if (!classPeriods || classPeriods.length === 0) return undefined;
    const idx = getTermIndexFromSelected(selectedTerm);
    if (idx === undefined) return undefined;
    return classPeriods[idx];
}

export default function MonthGrid({ year, month, classPeriods, holidays, selectedTerm }: MonthGridProps) {

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthName = new Date(year, month).toLocaleString("en-US", { month: "long" });

    const cells: React.ReactNode[] = [];
    const selectedTermIndex = getTermIndexFromSelected(selectedTerm);
    const selectedPeriod = getSelectedTermClassPeriod(classPeriods, selectedTerm);

    for (let i = 0; i < firstDay; i++) {
        cells.push(<div key={`empty-${i}`} className={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(year, month, day);
        const { category } = getCategoryForDate(dateStr, classPeriods, holidays, selectedTerm);
        const isStartBoundary = isClassStartDate(dateStr, classPeriods, selectedTermIndex);
        const isLastBoundary = isClassEndDate(dateStr, classPeriods, selectedTermIndex);

        let displayCategory: DayCategory = category;
        let showDot = isStartBoundary || isLastBoundary;
        let dotColor: string = getCategoryDotColor("class");

        if (selectedTerm && selectedTerm !== "non-school-days" && selectedPeriod) {
            if (category === "class") {
                displayCategory = "class";
                dotColor = getCategoryDotColor("class");
            }
        }

        const bgColor = getCategoryBgColor(displayCategory);
        const textColor = getCategoryTextColor(displayCategory);

        const cellStyle: React.CSSProperties = {
            backgroundColor: displayCategory !== "none" ? bgColor : undefined,
            color: textColor,
        };

        const dayClasses = [
            styles.dayCell,
            displayCategory !== "none" ? styles.categoryCell : "",
        ]
            .filter(Boolean)
            .join(" ");

        cells.push(
            <div key={day} className={dayClasses} style={cellStyle}>
                {showDot ? (
                    <div
                        className={styles.dotBadge}
                        style={{ backgroundColor: dotColor }}
                    >
                        {String(day).padStart(2, "0")}
                    </div>
                ) : (
                    String(day).padStart(2, "0")
                )}
            </div>
        );
    }

    return (
        <div className={styles.monthGrid}>
            <div className={styles.monthTitle}>{monthName} {year}</div>
            <div className={styles.monthBody}>
                <div className={styles.weekdayHeader}>
                    {WEEKDAY_HEADERS.map((w, i) => (
                        <div key={i} className={styles.weekdayCell}>
                            {w}
                        </div>
                    ))}
                </div>
                <div className={styles.daysGrid}>{cells}</div>
            </div>
        </div>
    );
}
