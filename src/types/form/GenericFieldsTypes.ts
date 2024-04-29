import { CustomAttributeProps, OptionsProps } from "../variables/AttributeColumns"

interface GenericFieldsComponentProps {
    attribute: CustomAttributeProps
    disabled: boolean
    valueType: CustomAttributeProps["valueType"]
}

interface FormFieldsProps {
<<<<<<< HEAD
    name: string
    disabled: boolean
    required: string | boolean
    type?: string
    optionSet?: CustomAttributeProps["options"]
    trackedEntity?: string
=======
    disabled: boolean
    required: string | boolean
    type?: string
    name?: string
    optionSet?: CustomAttributeProps["options"]
>>>>>>> 61237f5748d5c7a10408db7665e9059cf5d8906d
}

interface MutlipleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}

interface AutoCompleteProps {
    disabled?: boolean
    options?: CustomAttributeProps["options"]
    name: string
    required?: string | boolean
}

interface SwitchFieldProps {
    disabled: boolean
    required: string | boolean
}

interface CheckFieldProps {
    disabled: boolean
    required: string | boolean
}


interface SingleSelectProps {
    disabled: boolean
    options: OptionsProps[]
}


export type { GenericFieldsComponentProps, FormFieldsProps, MutlipleSelectProps, AutoCompleteProps, SwitchFieldProps, CheckFieldProps, SingleSelectProps }
