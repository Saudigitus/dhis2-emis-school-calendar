import React from 'react';
import style from "./SideBar.module.css"
import Badge from '../../badge/Badge';
import { type SideBarSubItemProps } from '../../../types/sideBar/SideBarTypes';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useConfig } from '@dhis2/app-runtime';

export default function SideBarSubItem({ icon, label, showBadge, disabled, route, appName }: SideBarSubItemProps) {
    const { baseUrl } = useConfig()

    return (
        <NavLink to={`${baseUrl}/api/apps/${appName}/index.html#/${route}`}>
            <li className={location.hash.slice(1) === route ? style.SideBarSubItemContainerActive : classNames(style.SideBarSubItemContainer, (Boolean(disabled)) && style.SideBarDisabledSubItem)}>
                <img src={icon} /> <span className={style.SideBarSubItemLabel}>{label}</span>
                {showBadge ? <div className={style.BadgeContainer}><Badge value='10' /></div> : null}
                <div className={style.TooltipContainer}>
                    {label}
                </div>
            </li>
        </NavLink>
    )
}
