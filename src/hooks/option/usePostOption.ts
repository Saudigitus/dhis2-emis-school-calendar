import { useState } from 'react';
import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";

const OPTIONQUERY: any = {
    type: 'create',
    resource: "options",
    data: ({ data }: any) => data,
}

export const usePostOption = () => {
    const engine = useDataEngine()
    // const { refetch } = useDataStore()
    const { hide, show } = useShowAlerts()
    const [loading, setloading] = useState(false)


    async function postOption(data: any, msg: string | null): Promise<void> {
        setloading(true)
        await engine.mutate(OPTIONQUERY, {
            variables: { data: data },
            onComplete() {
                setloading(false)
                if (msg !== null) {
                    show({
                        message: msg,
                        type: { success: true }
                    });
                    setTimeout(hide, 5000);
                }
                // void refetch()
            },
            onError(error) {
                setloading(false)
                show({
                    message: `Could not update data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }
        });
    }

    return { loading, postOption }
}