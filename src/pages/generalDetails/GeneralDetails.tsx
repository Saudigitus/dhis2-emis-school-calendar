import React from 'react'
import { WithPadding } from '../../components'
import GeneralDetailsForm from '../../components/forms/GeneralDetailsForm'

function GeneralDetails() {
  return (
    <WithPadding padding="10px 30px">
        <h5>General Details</h5>
        <GeneralDetailsForm/>
    </WithPadding>
  )
}

export default GeneralDetails
