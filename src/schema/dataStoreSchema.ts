import {atom} from "recoil"
import {type dataStoreRecord} from "../types/dataStore/DataStoreConfig"

export const DataStoreState = atom<dataStoreRecord>({
    key: "dataStore-get-state",
    default: Object()
})
