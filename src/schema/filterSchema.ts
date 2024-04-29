import { atom } from "recoil"

export interface filterSchema {
    name?: string
    program?: string
    createdAt?: {
        startDate?: string
        endDate?: string
    }
    updatedAt?: {
        startDate?: string
        endDate?: string
    }
}

export const TableFilterState = atom<filterSchema>({
    key: "TableFilterState-get-state",
    default: {}
})
