import React from 'react'
const { Field } = ReactFinalForm
import { ReactFinalForm, SwitchFieldFF, hasValue } from '@dhis2/ui'
import { SwitchFieldProps } from '../../../types/form/GenericFieldsTypes'

function SwitchInput(props: SwitchFieldProps) {
    return (
        <Field
            {...props}
            type="checkbox"
            component={SwitchFieldFF}
            validate={(Boolean(props.required)) && hasValue}
            disabled={props.disabled}
        />
    )
}

export default SwitchInput
