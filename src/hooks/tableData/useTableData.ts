import { useRecoilValue } from "recoil"
import { DataStoreState } from "../../schema/dataStoreSchema"
import data from '../../utils/constants/data.json'
export function useTableData() {
    const datastoreTemplates = useRecoilValue(DataStoreState)

    return { tableData: data}
}
