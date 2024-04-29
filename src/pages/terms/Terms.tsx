import React from 'react'
import { IconUserGroup16 } from '@dhis2/ui'
import { WithPadding } from '../../components'
import TermForm from '../../components/forms/TermForm'
import DropdownButtonComponent from '../../components/buttons/DropdownButton'

function Terms() {
  //USE SOMETHING TO GET ROUTE TERM NUMBER/ID TO RENDER CONDITIONALLY
  // const { } = use

  return (
    <WithPadding padding="10px">
      <DropdownButtonComponent name='Term' options={[]} disabled={false} icon={<IconUserGroup16 />} />
      <TermForm />
    </WithPadding>

  )
}

export default Terms