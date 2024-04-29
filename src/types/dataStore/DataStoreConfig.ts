interface defaults {
    currentAcademicYear: string
}

interface dataStoreRecord {
    key: string
    defaults: defaults
    classPeriods: [
        {
            "description": string
            "endDate": Date
            "startDate": Date
        }
    ]
    holidays: [
        {
            "date": Date
            "event": string
            "type": string
        }
    ]
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

export type {dataStoreRecord}
