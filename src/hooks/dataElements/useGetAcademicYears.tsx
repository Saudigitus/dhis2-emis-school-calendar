import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { ValuesDataStoreState } from "../../schema/valuesDataStoreSchema";

const DATAELEMENT_QUERY: any = ({
    dataElement: {
        resource: "dataElements",
        id: ({ id }: { id: string }) => id,
        params: {
            fields: "optionSet[options[code~rename(value),name~rename(label)]]"
        }
    }
})

export const useGetAcademicYears = () => {
    const valuesDataStore = useRecoilValue(ValuesDataStoreState)
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState<{ value: any; label: any }[]>([])

    async function getAcademicYear({ type }: { type: string }) {
        setLoading(true);

        const academic = valuesDataStore.find((item: any) => item.key === type)?.registration?.academicYear || [];

        if (academic.length === 0) {
            show({
                message: `No academic year found for type: ${type}. Please ensure the data element is configured correctly.`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setLoading(false);
            setdata([])
            return;
        }

        let options: any[] = []
        await engine.query(DATAELEMENT_QUERY, { variables: { id: academic } })
            .then((response: any) => {
                options = response.dataElement.optionSet.options

            }).catch((error: any) => {
                show({
                    message: `Error fetching data element: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            })

        setdata(options)
        setLoading(false);

    }

    return {
        getAcademicYear,
        loading,
        data
    };
}
