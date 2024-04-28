import React from 'react'
import {WithPadding} from '../../components'
import style from './NonSchoolDays.module.css'
import OffDaysCard from "../../components/card/CardComponent";
import {Paper} from "@material-ui/core";
import Table from "../../components/table/render/Table";

const NonSchoolDays = () => {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <WithPadding padding="10px 30px">
            <div className={style.title}>Non School Days</div>
            <Table/>
        </WithPadding>
    )
}

export default NonSchoolDays
