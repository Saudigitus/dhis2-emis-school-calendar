import { atom } from "recoil"

export interface academicYearRecord {
    options: {
        value: string
        label: string
        sortOrder?: number
    }[]
    id: string
}

export const AcademicYearState = atom<academicYearRecord>({
    key: "academicYear-get-state",
    default: { options: [], id: "" },
})
