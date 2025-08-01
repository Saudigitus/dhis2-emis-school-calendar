import { atom } from "recoil";
import {type CardSubItemProps} from "../types/card/CardTypes";

interface todelete {
    data: CardSubItemProps
    delete: boolean
}
export const deleteState = atom<todelete>({
    key: "delete-state",
    default: Object()
})
