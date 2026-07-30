import { type schoolCalendar } from "../../types/dataStore/DataStoreConfig";
import type { SidebarOption } from "../../components/sidebar/SidebarDropdown";

export type TermColorKey = "term1" | "term2" | "term3" | "break" | "exam" | "none";

export type DayCategory = "class" | "exam" | "break" | "holiday" | "none";

const TERM_COLORS: Record<TermColorKey, { bg: string; text: string }> = {
    term1: { bg: "#E3F2E9", text: "#1B5E20" },
    term2: { bg: "#D6E8F7", text: "#194775" },
    term3: { bg: "#FFF3D6", text: "#8A6D00" },
    break: { bg: "#FFF3D6", text: "#8A6D00" },
    exam: { bg: "#D6E8F7", text: "#194775" },
    none: { bg: "transparent", text: "#5a6370" },
};

const CATEGORY_COLORS: Record<DayCategory, { bg: string; text: string; dot: string }> = {
    class: { bg: "#E3F2E9", text: "#1B5E20", dot: "#1B5E20" },
    exam: { bg: "#D6E8F7", text: "#194775", dot: "#194775" },
    break: { bg: "#FFF3D6", text: "#B38600", dot: "#E6A817" },
    holiday: { bg: "#FFE5E5", text: "#B71C1C", dot: "#E53935" },
    none: { bg: "transparent", text: "#5a6370", dot: "transparent" },
};

export function getCategoryForDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"],
    holidays: schoolCalendar["holidays"],
    selectedTerm?: SidebarOption
): { category: DayCategory; isStartBoundary: boolean; isEndBoundary: boolean } {
    if (isHolidayDate(dateStr, holidays)) {
        return { category: "holiday", isStartBoundary: false, isEndBoundary: false };
    }

    if (!classPeriods || classPeriods.length === 0) {
        return { category: "none", isStartBoundary: false, isEndBoundary: false };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return { category: "none", isStartBoundary: false, isEndBoundary: false };
    }

    for (let i = 0; i < classPeriods.length; i++) {
        const period = classPeriods[i];
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const startISO = start.toISOString().split("T")[0];
        const endISO = end.toISOString().split("T")[0];

        if (date >= start && date <= end) {
            const isStart = startISO === dateStr;
            const isEnd = endISO === dateStr;
            const isSelected =
                (selectedTerm === "term-1" && i === 0) ||
                (selectedTerm === "term-2" && i === 1) ||
                (selectedTerm === "term-3" && i === 2) ||
                !selectedTerm ||
                selectedTerm === "non-school-days";

            if (isSelected) {
                return { category: "class", isStartBoundary: isStart, isEndBoundary: isEnd };
            }
            return { category: "none", isStartBoundary: isStart, isEndBoundary: isEnd };
        }
    }

    return { category: "none", isStartBoundary: false, isEndBoundary: false };
}

export function getExamInfoForDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"],
    termIndex: number
): { isExam: boolean; isStartBoundary: boolean; isEndBoundary: boolean } {
    return { isExam: false, isStartBoundary: false, isEndBoundary: false };
}

export function getBreakInfoForDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"],
    termIndex: number
): { isBreak: boolean; isStartBoundary: boolean; isEndBoundary: boolean } {
    return { isBreak: false, isStartBoundary: false, isEndBoundary: false };
}

export function getTermColorForDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"]
): TermColorKey {
    if (!classPeriods || classPeriods.length === 0) return "none";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "none";

    for (let i = 0; i < classPeriods.length; i++) {
        const period = classPeriods[i];
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);

        if (date >= start && date <= end) {
            const termKey = (period.key || "").toLowerCase();
            if (termKey.includes("1")) return "term1";
            if (termKey.includes("2")) return "term2";
            if (termKey.includes("3")) return "term3";
            const keys: TermColorKey[] = ["term1", "term2", "term3"];
            return keys[i] || "term1";
        }
    }

    return "break";
}

export function getTermColorByIndex(termIndex: number): TermColorKey {
    const keys: TermColorKey[] = ["term1", "term2", "term3"];
    return keys[termIndex] || "break";
}

export function getTermBgColor(colorKey: TermColorKey): string {
    return TERM_COLORS[colorKey].bg;
}

export function getTermTextColor(colorKey: TermColorKey): string {
    return TERM_COLORS[colorKey].text;
}

export function getCategoryBgColor(category: DayCategory): string {
    return CATEGORY_COLORS[category].bg;
}

export function getCategoryTextColor(category: DayCategory): string {
    return CATEGORY_COLORS[category].text;
}

export function getCategoryDotColor(category: DayCategory): string {
    return CATEGORY_COLORS[category].dot;
}

export function getTermHighlightBorder(termIndex: number): string {
    const borders = ["#1B5E20", "#194775", "#E6A817"];
    return borders[termIndex] || "#9E9E9E";
}

export function isHolidayDate(dateStr: string, holidays: schoolCalendar["holidays"]): boolean {
    if (!holidays || holidays.length === 0) return false;
    return holidays.some((h) => {
        const hDate = new Date(h.date).toISOString().split("T")[0];
        return hDate === dateStr;
    });
}

export function isExamStartOrEnd(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"]
): boolean {
    if (!classPeriods || classPeriods.length === 0) return false;
    return classPeriods.some((p) => {
        const s = new Date(p.startDate).toISOString().split("T")[0];
        const e = new Date(p.endDate).toISOString().split("T")[0];
        return s === dateStr || e === dateStr;
    });
}

export function isClassStartDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"],
    termIndex?: number
): boolean {
    if (!classPeriods || classPeriods.length === 0) return false;
    const periods = termIndex !== undefined ? [classPeriods[termIndex]].filter(Boolean) : classPeriods;
    return periods.some((p) => {
        const s = new Date(p.startDate).toISOString().split("T")[0];
        return s === dateStr;
    });
}

export function isClassEndDate(
    dateStr: string,
    classPeriods: schoolCalendar["classPeriods"],
    termIndex?: number
): boolean {
    if (!classPeriods || classPeriods.length === 0) return false;
    const periods = termIndex !== undefined ? [classPeriods[termIndex]].filter(Boolean) : classPeriods;
    return periods.some((p) => {
        const e = new Date(p.endDate).toISOString().split("T")[0];
        return e === dateStr;
    });
}
