
interface defaultProps {
    attribute: string
    value: string
    headers: Array<{
        id: string
        options?: any
    }>
}

export function getDisplayName({ attribute, value, headers }: defaultProps): string {
    if (headers.length > 0) {
        for (const iterator of headers) {
            if (iterator.id === attribute && typeof iterator.options !== 'undefined') {
                for (const op of iterator?.options?.options || iterator?.options?.optionSet?.options || []) {
                    if (op.value === value) return op.label
                }
            }
        }
    }
    return value
}
