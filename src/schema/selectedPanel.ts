import { atom } from "recoil";

// side panel shown on the year page, kept when the page re-renders after a save
export const SelectedPanelAtom = atom<{ id?: string, panel: string }>({
    key: "selected-panel",
    default: { panel: "general-details" }
})
