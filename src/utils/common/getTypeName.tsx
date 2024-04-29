import fields from '../constants/fields.json'

export function getDisplayName(id: string): string {
    let label = id

    // eslint-disable-next-line array-callback-return
    fields[1]?.options?.optionSet.options.map((option: any) => {
        if (option.value === id) label = option.label
    })

    return label
}
