import { atom } from "recoil"
import { type CustomAttributeProps } from "../types/attributes/AttributeColumns";

export const TableColumnState = atom<CustomAttributeProps[]>({
    key: "table-column-state",
    default: []
})
