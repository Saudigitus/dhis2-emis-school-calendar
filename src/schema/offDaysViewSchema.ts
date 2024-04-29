import { atom } from "recoil";

export const offDaysViewState = atom<string>({
    key: "oddFays-view-state",
    default: "list"
})
