import { atom } from "recoil"

export interface academicYearRecord {
    value: string
    label: string
}

export const AcademicYearState = atom<academicYearRecord[]>({
    key: "academicYear-get-state",
    default: [],
})
