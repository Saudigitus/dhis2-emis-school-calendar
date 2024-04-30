interface defaults {
    currentAcademicYear: string
}

interface ClassPeriodType {
    key: string
    description: string
    endDate: string
    startDate: string
}

interface HolidayType {
    date: Date
    event: string
    type: string
}

interface dataStoreRecord {
    key: string
    defaults: defaults
academicYear: {
        "endDate": Date
        "startDate": Date
    }
    classPeriods: ClassPeriodType[]
    holidays: HolidayType[]
    weekDays: {
        "friday": boolean
        "monday": boolean
        "saturday": boolean
        "sunday": boolean
        "thursday": boolean
        "tuesday": boolean
        "wednesday": boolean
    }
}

export type { dataStoreRecord, ClassPeriodType, HolidayType }
