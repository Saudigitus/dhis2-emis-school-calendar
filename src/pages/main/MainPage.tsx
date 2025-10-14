import React from 'react'
import Repeatable from '../../repeatable/Repeatable'

function MainPage() {

  return (
    <>

      <div className='h-100'>
        <div className='col-md-12 p-0'>
          {/* <WithPadding padding='10px 0px 10px 25px'>
           
           
          </WithPadding> */}
          <Repeatable />
        </div>
        {/* <div className={`col-md-3 ${style.mainNonRepeatableContainer}`}>
          <GeneralDetails />
        </div> */}
      </div>
    </>
  )
}

export default MainPage