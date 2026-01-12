import React from 'react'
import { WithPadding } from '../../components'
import TermsList from '../../components/termsList/TermsList'
import { D2I18n } from 'dhis2-semis-types'

function Terms({ i18next }: { i18next: D2I18n }) {

  return (
    <WithPadding padding="10px">
      <TermsList i18next={i18next} />
    </WithPadding>

  )
}

export default Terms