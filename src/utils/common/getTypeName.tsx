import { D2I18n } from 'dhis2-semis-types'
import { nonSchooldayFields } from '../constants/fields'

export function getDisplayName(id: string, i18n: D2I18n): string {
    let label = id

    // eslint-disable-next-line array-callback-return
    nonSchooldayFields(i18n)[1]?.options?.optionSet.options.map((option: any) => {
        if (option.value === id) label = option.label
    })

    return label
}
