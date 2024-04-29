import { useDataEngine } from "@dhis2/app-runtime"
import { useSetRecoilState } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';
import useShowAlerts from '../commons/useShowAlert';
import { LoadState } from '../../schema/loadSchema';
import i18n from "../../locales";
import {type dataStoreRecord} from "../../types/dataStore/DataStoreConfig";

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/tdp-config/schoolCalendar",
        params: {
            fields: "."
        }
    }
})

export function getDataStoreData() {
    const engine = useDataEngine()
    const { hide, show } = useShowAlerts()
    const setDataStoreState = useSetRecoilState(DataStoreState);
    const setLoading = useSetRecoilState(LoadState);

    async function getScholCalendar() {
        setLoading(true)

        await engine.query(DATASTORE_QUERY, {
            onComplete: (data) => {
                setDataStoreState(data?.config as unknown as dataStoreRecord[])
                setLoading(false)
            },
            onError: (error) => {
                show({
                    message: `${i18n.t("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }
        })
    }

    return {
        getScholCalendar
    }
}
