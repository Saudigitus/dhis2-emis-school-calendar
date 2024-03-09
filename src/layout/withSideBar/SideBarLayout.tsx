import React from 'react'
import style from "../layout.module.css"
import { SideBarLayoutProps } from '../../types/layout/SideBarLayoutTypes'
import { SideBar } from '../../components/layout'

export default function SideBarLayout(props:  SideBarLayoutProps): React.ReactElement {
    const { children } = props;
    
    return (
        <div className={style.layoutContainer}>
            <SideBar />
            <main className={style.mainContentContainer}>{children}</main>
        </div>
    )
}
