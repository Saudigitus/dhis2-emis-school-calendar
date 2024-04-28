import React from 'react'
import {WithPadding} from '../../components'
import style from './NonSchoolDays.module.css'
import OffDaysCard from "../../components/card/CardComponent";
import {Paper} from "@material-ui/core";

const NonSchoolDays = () => {
    const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    return (
        <WithPadding padding="10px 30px">
            <div className={style.title}>Non School Days</div>
            <div className={style.container}>
                <div className={style.listContainer}>
                    <span className={style.sectionTitle}>Non School Days List</span>
                    <div className={style.list}>
                        {
                            arr.map(()=>{
                                return <div>
                                    <OffDaysCard offDayType={'Public Holiday'} title={'Independence Day'} date={'2024-10-10'}/>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className={style.formContainer}>
                    <span className={style.sectionTitle} >Add new off day</span>
                </div>
            </div>
        </WithPadding>
    )
}

export default NonSchoolDays
