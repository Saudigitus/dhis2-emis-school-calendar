import { atom } from "recoil";

export const SelectedTermAtom = atom<string>({
    key: "selected-term",
    default: ""
})
