import React from 'react'
import style from "../layout.module.css"
import { SimpleLayoutProps } from '../../types/layout/SimpleLayoutTypes'

export default function SimpleLayout(props:  SimpleLayoutProps) {
    const { children } = props;
    return (
        <div className={style.layoutContainer}>
            <main className={style.mainContentContainer}>{children}</main>
        </div>
    )
}
