import { atom } from "recoil";
import {type CardSubItemProps} from "../types/card/CardTypes";

interface edit {
    data: CardSubItemProps
    edit: boolean
}
export const editState = atom<edit>({
    key: "edit-state",
    default: Object()
})
