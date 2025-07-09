import React from 'react'
import GeneralDetails from '../generalDetails/GeneralDetails'
import style from './main.module.css'
import Repeatable from '../../repeatable/Repeatable'
import { useLocation } from 'react-router-dom'

function MainPage() {
  const location = useLocation()
  
  return (
    <div className='row h-100'>
      <div className='col-md-9'>
        <Repeatable />
      </div>
      <div className={`col-md-3 ${style.mainNonRepeatableContainer}`}>
        <GeneralDetails />
      </div>
    </div>
  )
}

export default MainPage