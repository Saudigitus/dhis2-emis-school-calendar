import {useState} from 'react';
import {useDataEngine} from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import {getDataStoreData} from "./getDataStoreData";

const DATASTOREQUERY: any = {
    resource: "dataStore/tdp-config/schoolCalendar",
    data: ({data}: any) => data,
    type: 'update'
}

export const dataStoreManagement = () => {
    const engine = useDataEngine()
    const {
        hide,
        show
    } = useShowAlerts()
    const [loading, setloading] = useState(false)
    const {getScholCalendar} = getDataStoreData()

    async function postData(data: any): Promise<void> {
        setloading(true)
        await engine.mutate(DATASTOREQUERY, {
            variables: {
                data: data
            },
            onComplete() {
                void getScholCalendar()
            },
            onError(error) {
                show({
                    message: `Could not create data: ${error.message}`,
                    type: {critical: true}
                });
                setTimeout(hide, 5000);
            }
        });
        setloading(false)
    }

    return {
        loading,
        postData
    }
}
