import { useState } from "react";
import useShowAlerts from "../commons/useShowAlert";
import { useRecoilValue } from "recoil";
import { ValuesDataStoreState } from "../../schema/valuesDataStoreSchema";
import { useDataEngine } from "@dhis2/app-runtime";

const DATAELEMENT_QUERY: any = ({
    dataElement: {
        resource: "programStages",
        id: ({ id }: { id: string }) => id,
        params: {
            fields: "*"
        }
    }
})

export const useGetAcademicYears = () => {
    const valuesDataStore = useRecoilValue(ValuesDataStoreState)
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState<{ value: any; label: any }[]>([])

    async function getTerms({ type }: { type: string }) {
        setLoading(true);

        const terms = valuesDataStore?.find((item: any) => item.key === type)?.performance?.programStages || [];

        const dataElements: any[] = []
        for (const element of terms) {
            await engine.query(DATAELEMENT_QUERY, { variables: { id: element.programStage } })
                .then((response: any) => {
                    dataElements.push({
                        value: response.dataElement.id,
                        label: response.dataElement.displayName,
                    })
                }).catch((error: any) => {
                    show({
                        message: `Error fetching data element: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                })
        }

        setdata(dataElements)
        setLoading(false);

    }

    return {
        getTerms,
        loading,
        data
    };
}
