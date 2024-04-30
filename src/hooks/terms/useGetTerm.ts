import { useRecoilValue } from "recoil"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import { DataStoreState } from "../../schema/dataStoreSchema"
import { ClassPeriodType } from "../../types/dataStore/DataStoreConfig"

const useGetTerm = () => {
    const location = useLocation()
    const dataStoreRecord = useRecoilValue(DataStoreState)
    const [classPeriod, setClassPeriod] = useState<any>({});

    console.log(location, dataStoreRecord)
    useEffect(() => {
        setClassPeriod(dataStoreRecord?.classPeriods?.find((x: ClassPeriodType) => x.key === location.pathname.slice(1)))
    }, [location])

    console.log(classPeriod)
    return { classPeriod }
}

export default useGetTerm