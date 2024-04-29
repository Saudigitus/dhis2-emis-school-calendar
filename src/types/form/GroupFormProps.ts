import { type CustomAttributeProps } from "../attributes/AttributeColumns";

interface GroupFormProps {
    name?: string
    description: string
    fields: CustomAttributeProps[]
    disabled: boolean
}

export type { GroupFormProps }
