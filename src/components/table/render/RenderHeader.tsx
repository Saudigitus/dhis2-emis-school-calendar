import React from 'react'
import { RowTable } from '../components'
import classNames from 'classnames';
import { makeStyles, createStyles, type Theme } from '@material-ui/core/styles';
import HeaderCell from '../components/head/HeaderCell';
import { CustomAttributeProps } from '../../../types/attributes/AttributeColumns';

interface renderHeaderProps {
    rowsHeader: CustomAttributeProps[]
    orderBy: string
    order: "asc" | "desc"
    createSortHandler: (property: string) => any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: { width: "100%" },
        cell: {
            padding: `${theme.spacing(1) / 2}px ${theme.spacing(1) * 7}px ${theme.spacing(1) /
                2}px ${theme.spacing(1) * 3}px`,
            '&:last-child': {
                paddingRight: 2 * 3
            },
            borderBottomColor: "rgba(224, 224, 224, 1)"
        },
        bodyCell: {
            fontSize: theme.typography.pxToRem(13),
            color: theme.palette.text.primary
        },
        headerCell: {
            fontSize: theme.typography.pxToRem(12),
            color: theme.palette.text.secondary,
            fontWeight: 500
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        }
    })
);

function RenderHeader(props: renderHeaderProps): React.ReactElement {
    const { rowsHeader } = props
    const classes = useStyles()

    const headerCells = rowsHeader?.filter(x => x.visible)?.map((column) => (
        <HeaderCell
            key={column.id}
            className={classNames(classes.cell, classes.headerCell)}
        >
            {column.displayName}
        </HeaderCell>
    ))

    return (
        <thead>
            <RowTable
                className={classes.row}
            >
                {headerCells}
            </RowTable>
        </thead>
    )
}

export default RenderHeader
