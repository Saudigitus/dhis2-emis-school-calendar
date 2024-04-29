import { type Attribute } from '../generated/models';

export enum VariablesTypes {
    DataElement = "dataElement",
    Attribute = "attribute",
    OuData = "ouData"
}

export interface CustomAttributeProps {
    id: string
    displayName?: string
    header?: string
    required?: boolean
    name: string
    programStage?: string
    assignedValue?: string | undefined
    labelName?: string
    valueType: typeof Attribute.valueType
    disabled?: boolean
    visible?: boolean
    options?: {
        optionSet: {
            id: string
            options: [{
                value: string
                label: string
            }]
        }
    }
    pattern?: string
    searchable?: boolean
    error?: boolean
    warning?: boolean
    content?: string
    key?: any
    description?: string
    type?: VariablesTypes
    validationText?: string
    helpText?: string
    value?: string
    renderType?: {
        DESKTOP: {
            type: string
        }
    }
}


export interface CustomSectionAttributeProps {
    displayName?: string
    variable: CustomAttributeProps[]
}