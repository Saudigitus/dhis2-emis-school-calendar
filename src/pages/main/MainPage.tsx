import React from 'react'
import Repeatable from '../../repeatable/Repeatable'
import { D2I18n } from 'dhis2-semis-types'

function MainPage({ i18next }: { i18next: D2I18n }) {

  return (
    <>

      <div className='h-100'>
        <div className='col-md-12 p-0'>
          {/* <WithPadding padding='10px 0px 10px 25px'>
           
           
          </WithPadding> */}
          <Repeatable i18next={i18next}/>
        </div>
        {/* <div className={`col-md-3 ${style.mainNonRepeatableContainer}`}>
          <GeneralDetails />
        </div> */}
      </div>
    </>
  )
}

export default MainPage