<<<<<<< HEAD
import { CustomAttributeProps } from "../variables/AttributeColumns"

interface GroupFormProps {
    name: string
    description?: string
=======
import { type CustomAttributeProps } from "../attributes/AttributeColumns";

interface GroupFormProps {
    name?: string
    description: string
>>>>>>> 61237f5748d5c7a10408db7665e9059cf5d8906d
    fields: CustomAttributeProps[]
    disabled: boolean
}

<<<<<<< HEAD
export type { GroupFormProps }
=======
export type { GroupFormProps }
>>>>>>> 61237f5748d5c7a10408db7665e9059cf5d8906d
