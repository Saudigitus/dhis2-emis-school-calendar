import { useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';
import useShowAlerts from '../commons/useShowAlert';
import { ValuesDataStoreState } from "../../schema/valuesDataStoreSchema";

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/edson/schoolCalendar",
        params: {
            fields: "*"
        }
    },
    values: {
        resource: "dataStore/edson/values",
        params: {
            fields: "*"
        }
    }
})

export function useDataStore() {
    const setDataStoreState = useSetRecoilState(DataStoreState);
    const setValuesDataStoreState = useSetRecoilState(ValuesDataStoreState)
    const { hide, show } = useShowAlerts()

    const { data, loading, error, refetch } = useDataQuery<{ config: any, values: any }>(DATASTORE_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        },
        onComplete(data) {
            setDataStoreState(data?.config)
            setValuesDataStoreState(data?.values)
        }
    })

    return {
        data,
        loading,
        error,
        refetch
    }
}
