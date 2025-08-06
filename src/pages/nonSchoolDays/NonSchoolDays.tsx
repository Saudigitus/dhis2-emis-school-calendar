import React from 'react'
import OffDaysList from "../../components/offDaysList/OffDaysList";
import { WithPadding } from 'dhis2-semis-components';

const NonSchoolDays = () => {
    return (
        <WithPadding p="15px">
            <OffDaysList />
        </WithPadding>
    )
}

export default NonSchoolDays
