import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { ValuesDataStoreState } from "../../schema/valuesDataStoreSchema";
import { AcademicYearState } from "../../schema/academicYearSchema";

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
    const valuesDataStore = useRecoilValue(ValuesDataStoreState);
    const [academicYearState, setAcademicYearState] = useRecoilState(AcademicYearState)
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false);

    async function getAcademicYear() {
        if (academicYearState.length> 0) {
            return
        }
        setLoading(true);

        const academic = valuesDataStore || "";

        if (academic.length === 0) {
            show({
                message: `No academic year found. Please ensure the data element is configured correctly.`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setLoading(false);
            setAcademicYearState([])
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

        setAcademicYearState(options.sort((a, b) => b.value - a.value))
        setLoading(false);

    }

    return {
        getAcademicYear,
        loading,
        data: academicYearState
    };
}
