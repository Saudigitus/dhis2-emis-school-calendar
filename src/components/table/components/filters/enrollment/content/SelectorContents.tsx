import React from 'react'
import { Button } from '@dhis2/ui';
import { makeStyles, createStyles, type Theme } from '@material-ui/core/styles';
import FilterComponents from '../../fields/FilterComponents';
import { type CustomAttributeProps } from '../../../../../../types/table/AttributeColumns';

const getStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonsContainer: {
            paddingTop: theme.typography.pxToRem(8)
        },
        buttonContainer: {
            paddingRight: theme.typography.pxToRem(8),
            display: 'inline-block'
        }
    })
);

interface SelectorContentsProps {
    onClose: () => void
    disabledReset: boolean
    colum: CustomAttributeProps
    onChange: () => void
    value: any
    disabled: boolean
}

function SelectorContents(props: SelectorContentsProps) {
    const { onClose, disabledReset, colum, onChange } = props;

    const classes = getStyles()

    return (
        <>
            <FilterComponents
                type={colum.valueType}
                column={colum}
                {...props}
            />
            <div
                className={classes.buttonsContainer}
            >
                <div
                    className={classes.buttonContainer}
                >
                    <Button
                        dataTest="list-view-filter-cancel-button"
                        secondary
                        onClick={onClose}
                        disabled={disabledReset}

                    >
                        {('Clear')}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SelectorContents
