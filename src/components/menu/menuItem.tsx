import React from 'react'
import { MenuItem } from '@dhis2/ui'
import styles from './menu.module.css'
import classNames from 'classnames'

function Item(props: any) {

    return (
        <MenuItem
            icon={props.icon}
            label={props.label}
            className={classNames(styles.menu_item, props.className)}
            disabled={props.disabled}
            onClick={props.onClick}
        />
    )
}

export default Item