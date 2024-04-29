import {useState} from 'react';
import {useDataEngine} from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import {useDataStore} from "../appwarapper/useDataStore";

const DATASTOREQUERY: any = {
    resource: "dataStore/semis/schoolCalendar",
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
    const {refetch} = useDataStore()

    async function postData(data: any): Promise<void> {
        setloading(true)
        await engine.mutate(DATASTOREQUERY, {
            variables: {
                data: data
            },
            onComplete() {
                show({
                    message: `Data updated successfully`,
                    type: {success: true}
                });
                setTimeout(hide, 5000);
                void refetch()
            },
            onError(error) {
                show({
                    message: `Could not update data: ${error.message}`,
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
