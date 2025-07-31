import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";
import useShowAlerts from "../commons/useShowAlert";
import { AcademicYearState } from "../../schema/academicYearSchema";
import { SchoolCalendarData } from "dhis2-semis-components";

const DATAELEMENT_QUERY: any = ({
    dataElement: {
        resource: "dataElements",
        id: ({ id }: { id: string }) => id,
        params: {
            fields: "optionSet[id, options[code~rename(value),name~rename(label)]]"
        }
    }
})

export const useGetAcademicYears = () => {
    const engine = useDataEngine()
    const { hide, show } = useShowAlerts()
    const [loading, setLoading] = useState(false);
    const schoolCalendar = useRecoilValue(SchoolCalendarData)
    const [academicYearState, setAcademicYearState] = useRecoilState(AcademicYearState)

    async function getAcademicYear(valuesDataStore: any) {
        // if (academicYearState?.options.length > 0) {
        //     return
        // }
        setLoading(true);

        const academic = schoolCalendar?.academicYear || "";
        if (academic.length === 0) {
            show({
                message: `No academic year found. Please ensure the data element is configured correctly.`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            setLoading(false);
            setAcademicYearState({ options: [], id: "" })
            return;
        }

        let options: any[] = []
        let optionSetId: string = ""
        await engine.query(DATAELEMENT_QUERY, { variables: { id: academic } })
            .then((response: any) => {
                options = response?.dataElement?.optionSet?.options
                optionSetId = response?.dataElement?.optionSet?.id

            }).catch((error: any) => {
                show({
                    message: `Error fetching data element: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            })

        setAcademicYearState({ options: options.sort((a, b) => b.value - a.value), id: optionSetId })
        setLoading(false);

    }

    const refetch = async (valuesDataStore: any) => {
        await getAcademicYear(valuesDataStore);
    };

    return {
        getAcademicYear,
        loading,
        refetch,
        data: academicYearState
    };
}
