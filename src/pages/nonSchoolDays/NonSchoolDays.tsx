import React from 'react'
import {WithPadding} from '../../components'
import OffDaysList from "../../components/offDaysList/OffDaysList";
import { D2I18n } from 'dhis2-semis-types';

const NonSchoolDays = ({ i18next }: { i18next: D2I18n }) => {
    return (
        <WithPadding padding="10px">
            <OffDaysList i18next={i18next}/>
        </WithPadding>
    )
}

export default NonSchoolDays
