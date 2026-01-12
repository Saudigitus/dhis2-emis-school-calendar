import React from 'react'
import { WithPadding } from '../../components'
import GeneralDetailsForm from '../../components/forms/GeneralDetailsForm'
import { D2I18n } from 'dhis2-semis-types'

function GeneralDetails({ i18next }: { i18next: D2I18n }) {
  return (
    <WithPadding padding="10px">
      <GeneralDetailsForm i18next={i18next} />
    </WithPadding>
  )
}

export default GeneralDetails
