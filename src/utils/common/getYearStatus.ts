const DAY = 24 * 60 * 60 * 1000

// "YYYY-MM-DD" read as a local date, so the day does not move with the time zone
export function toLocalDate(value?: string): Date | undefined {
    const [year, month, day] = String(value ?? "").slice(0, 10).split("-").map(Number)
    return year && month && day ? new Date(year, month - 1, day) : undefined
}

export interface YearStatus {
    status: "upcoming" | "inProgress" | "ended"
    daysToStart: number
    percentDone: number
}

// where today is in the academic year; undefined when the year has no dates
export function getYearStatus(startDate?: string, endDate?: string, today = new Date()): YearStatus | undefined {
    const start = toLocalDate(startDate)
    const end = toLocalDate(endDate)
    if (!start || !end) return undefined

    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (now < start) {
        return { status: "upcoming", daysToStart: Math.round((start.getTime() - now.getTime()) / DAY), percentDone: 0 }
    }
    if (now > end) {
        return { status: "ended", daysToStart: 0, percentDone: 100 }
    }

    const total = end.getTime() - start.getTime()
    const percentDone = total > 0 ? Math.round(((now.getTime() - start.getTime()) / total) * 100) : 100
    return { status: "inProgress", daysToStart: 0, percentDone }
}
