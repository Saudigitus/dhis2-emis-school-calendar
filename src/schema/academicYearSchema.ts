import { atom } from "recoil"

interface academicYearRecord {
    value: string
    label: string
}

export const AcademicYearState = atom<academicYearRecord[]>({
    key: "academicYear-get-state",
    default: [],
})
