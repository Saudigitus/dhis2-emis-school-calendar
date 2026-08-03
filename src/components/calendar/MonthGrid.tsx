import React, { useState, useRef, useCallback } from "react";
import styles from "./MonthGrid.module.css";
import {
    getCategoryForDate,
    getCategoryBgColor,
    getCategoryTextColor,
    getCategoryDotColor,
    getTermColorForDate,
    getTermBgColor,
    getTermTextColor,
    getTermDotColor,
    isClassStartDate,
    type DayCategory,
    isClassEndDate,
} from "../../utils/common/getTermColor";
import type { schoolCalendar, HolidayType } from "../../types/dataStore/DataStoreConfig";
import type { SidebarOption } from "../sidebar/SidebarDropdown";
import { HolidayPopover } from "./HolidayPopover";

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
    if (selected === "term1") return 0;
    if (selected === "term2") return 1;
    if (selected === "term3") return 2;
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

function getHolidayForDate(dateStr: string, holidays: schoolCalendar["holidays"]): HolidayType | undefined {
    if (!holidays || holidays.length === 0) return undefined;
    return holidays.find((h) => {
        const hDate = new Date(h.date).toISOString().split("T")[0];
        return hDate === dateStr;
    });
}

interface ActiveHoliday {
    holiday: HolidayType;
    ref: React.RefObject<Element>;
}

export default function MonthGrid({ year, month, classPeriods, holidays, selectedTerm }: MonthGridProps) {

    const [activeHoliday, setActiveHoliday] = useState<ActiveHoliday | null>(null);

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

        const holiday = getHolidayForDate(dateStr, holidays);

        let displayCategory: DayCategory = category;
        let showDot = isStartBoundary || isLastBoundary;
        let dotColor: string = getCategoryDotColor("class");

        if (selectedTerm && selectedTerm !== "non-school-days" && selectedPeriod) {
            if (category === "class") {
                displayCategory = "class";
                dotColor = getCategoryDotColor("class");
            }
        }

        const termColorKey = displayCategory === "class"
            ? getTermColorForDate(dateStr, classPeriods)
            : null;
        const bgColor = termColorKey
            ? getTermBgColor(termColorKey)
            : getCategoryBgColor(displayCategory);
        const textColor = termColorKey
            ? getTermTextColor(termColorKey)
            : getCategoryTextColor(displayCategory);

        // dot badge uses the term's deeper, more saturated shade
        if (termColorKey) {
            dotColor = getTermDotColor(termColorKey);
        }

        const cellStyle: React.CSSProperties = {
            backgroundColor: displayCategory !== "none" ? bgColor : undefined,
            color: textColor,
        };

        const isHoliday = displayCategory === "holiday";

        const dayClasses = [
            styles.dayCell,
            displayCategory !== "none" ? styles.categoryCell : "",
            isHoliday ? styles.holidayDay : "",
        ]
            .filter(Boolean)
            .join(" ");

        cells.push(
            <HolidayDayCell
                key={day}
                day={day}
                dayClasses={dayClasses}
                cellStyle={isHoliday ? undefined : cellStyle}
                showDot={showDot}
                dotColor={dotColor}
                isHoliday={isHoliday}
                holiday={holiday}
                isActive={activeHoliday?.holiday === holiday}
                onOpen={(h, ref) => setActiveHoliday({ holiday: h, ref })}
                onClose={() => setActiveHoliday(null)}
            />
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

            {activeHoliday && (
                <HolidayPopover
                    holiday={activeHoliday.holiday}
                    reference={activeHoliday.ref}
                    onClose={() => setActiveHoliday(null)}
                />
            )}
        </div>
    );
}


interface HolidayDayCellProps {
    day: number;
    dayClasses: string;
    cellStyle?: React.CSSProperties;
    showDot: boolean;
    dotColor: string;
    isHoliday: boolean;
    holiday?: HolidayType;
    isActive: boolean;
    onOpen: (holiday: HolidayType, ref: React.RefObject<Element>) => void;
    onClose: () => void;
}

function HolidayDayCell({
    day,
    dayClasses,
    cellStyle,
    showDot,
    dotColor,
    isHoliday,
    holiday,
    isActive,
    onOpen,
    onClose,
}: HolidayDayCellProps) {
    const cellRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        if (!isHoliday || !holiday) return;
        if (isActive) {
            onClose();
        } else {
            onOpen(holiday, cellRef as React.RefObject<Element>);
        }
    }, [isHoliday, holiday, isActive, onOpen, onClose]);

    return (
        <div
            ref={cellRef}
            className={dayClasses}
            style={cellStyle}
            onClick={handleClick}
            title={isHoliday && holiday ? holiday.event : undefined}
        >
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
