export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined

    return 'some text'
}

export const maxLength = (max: number): FieldValidatorType => (value) => {
    if (value.length > max) return `Value > ${max}`
    return undefined
}