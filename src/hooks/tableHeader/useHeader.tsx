import { useRecoilValue } from "recoil";
import { TableColumnState } from "../../schema/columnSchema";
import {tableCols} from "../../utils/constants/fields";

export function useHeader() {
  const tableColumns = useRecoilValue(TableColumnState)

  return {
    columns: tableCols(tableColumns),
  };
}
