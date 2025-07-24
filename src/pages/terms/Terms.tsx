import React from 'react'
import { WithPadding } from '../../components'
import TermsList from '../../components/termsList/TermsList'

function Terms() {
  //USE SOMETHING TO GET ROUTE TERM NUMBER/ID TO RENDER CONDITIONALL

  return (
    <WithPadding padding="10px">
       <TermsList/>
    </WithPadding>

  )
}

export default Terms