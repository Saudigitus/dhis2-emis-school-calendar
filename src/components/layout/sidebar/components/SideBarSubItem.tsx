import React from 'react';
import style from "../sideBar.module.css"
import { Badge } from '../../../badge';
import classNames from 'classnames';
import { useConfig } from '@dhis2/app-runtime';
import { MenuDataItemProps } from '../../../../types/menu/MenuTypes';

export default function SideBarSubItem(props: MenuDataItemProps) {
    const { sidebarIcon, title, showBadge, disabled, route, appName } = props
    const { baseUrl } = useConfig()

    return (
        <a href={`${baseUrl}/api/apps/${appName}/index.html#/${route}`} className={style.subItemLink}>
            <li className={location.hash.slice(1) === route ? style.sideBarSubItemContainerActive : classNames(style.sideBarSubItemContainer, (Boolean(disabled)) && style.sideBarDisabledSubItem)}>
                <img src={sidebarIcon} /> <span className={style.sideBarSubItemLabel}>{title}</span>
                {showBadge ? <div className={style.badgeContainer}><Badge value='10' /></div> : null}
                <div className={style.tooltipContainer}>
                    {title}
                </div>
            </li>
        </a>
    )
}
