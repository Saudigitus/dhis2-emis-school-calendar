import React from 'react'
import style from "./badge.module.css"
import { BadgeProps } from '../../types/badge/Badge'


export default function Badge(props: BadgeProps): React.ReactElement {
    const { value } = props;
    
    return (
        <span className={style.badgeContainer}>{value}</span>
    )
}