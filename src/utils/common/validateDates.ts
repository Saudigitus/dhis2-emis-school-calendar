import { D2I18n } from "dhis2-semis-types";

// Dates are compared as YYYY-MM-DD strings
const toDay = (value: any): string => String(value ?? "").slice(0, 10)

const normalizeName = (value: any): string => String(value ?? "").replace(/\s+/g, "").toLowerCase()

const isOutsideYear = (date: string, yearStart: string, yearEnd: string): boolean =>
    Boolean(date) && ((Boolean(yearStart) && date < yearStart) || (Boolean(yearEnd) && date > yearEnd))

const outsideYearMessage = (i18n: D2I18n, yearStart: string, yearEnd: string): string =>
    i18n.t("The date must be within the academic year ({{startDate}} to {{endDate}})", { startDate: yearStart, endDate: yearEnd })

export function validateYearDates(values: any, i18n: D2I18n): Record<string, string> {
    const errors: Record<string, string> = {}
    const start = toDay(values?.startDate)
    const end = toDay(values?.endDate)

    if (start && end && end <= start) {
        errors.endDate = i18n.t("The end date must be after the start date")
    }
    return errors
}

export function validateTerm(values: any, calendar: any, editingKey: string | undefined, i18n: D2I18n): Record<string, string> {
    const errors: Record<string, string> = {}
    const start = toDay(values?.startDate)
    const end = toDay(values?.endDate)
    const yearStart = toDay(calendar?.academicYear?.startDate)
    const yearEnd = toDay(calendar?.academicYear?.endDate)
    const name = normalizeName(values?.description)
    const otherTerms = (calendar?.classPeriods ?? []).filter((term: any) => !editingKey || term?.key !== editingKey)

    if (name && otherTerms.some((term: any) => normalizeName(term?.description) === name || normalizeName(term?.key) === name)) {
        errors.description = i18n.t("A term with this name already exists")
    }

    if (isOutsideYear(start, yearStart, yearEnd)) {
        errors.startDate = outsideYearMessage(i18n, yearStart, yearEnd)
    }

    if (start && end && end < start) {
        errors.endDate = i18n.t("The end date must be on or after the start date")
    } else if (isOutsideYear(end, yearStart, yearEnd)) {
        errors.endDate = outsideYearMessage(i18n, yearStart, yearEnd)
    } else if (start && end) {
        const overlap = otherTerms.find((term: any) => toDay(term?.startDate) <= end && start <= toDay(term?.endDate))
        if (overlap) {
            errors.endDate = i18n.t("This term overlaps with another term ({{startDate}} to {{endDate}})", { startDate: toDay(overlap?.startDate), endDate: toDay(overlap?.endDate) })
        }
    }
    return errors
}

export function validateNonSchoolDay(values: any, calendar: any, originalDate: string | undefined, i18n: D2I18n): Record<string, string> {
    const errors: Record<string, string> = {}
    const date = toDay(values?.date)
    const yearStart = toDay(calendar?.academicYear?.startDate)
    const yearEnd = toDay(calendar?.academicYear?.endDate)

    if (isOutsideYear(date, yearStart, yearEnd)) {
        errors.date = outsideYearMessage(i18n, yearStart, yearEnd)
    } else if (date && (calendar?.holidays ?? []).some((holiday: any) => toDay(holiday?.date) === date && (!originalDate || toDay(originalDate) !== date))) {
        errors.date = i18n.t("This date already has a non-school day")
    }
    return errors
}
