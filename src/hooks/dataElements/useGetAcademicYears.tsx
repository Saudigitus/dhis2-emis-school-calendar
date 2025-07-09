import { useState } from "react";
import useShowAlerts from "../commons/useShowAlert";
import { useRecoilValue } from "recoil";
import { ValuesDataStoreState } from "../../schema/valuesDataStoreSchema";
import { useDataEngine } from "@dhis2/app-runtime";

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
