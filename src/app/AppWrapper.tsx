import React, { useEffect } from 'react'
import { type AppConfigurationsProps } from '../types/app/AppConfigurationsProps';
import { ValuesDataStoreState } from 'src/schema/valuesDataStoreSchema';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DataStoreState, SchoolCalendarData } from 'dhis2-semis-components';

export default function AppWrapper(props: AppConfigurationsProps) {
    const schoolCalendar = useRecoilValue(SchoolCalendarData)
    const setValuesDataStoreState = useSetRecoilState(ValuesDataStoreState)

    useEffect(() => {
        //TODO rever isso com base no que foi feito no useDataStore
        setValuesDataStoreState(schoolCalendar.academicYear ?? 'iDSrFrrVgmX' as unknown as any)
    }, [schoolCalendar])

    return (
        <>{props.children}</>
    )
}
