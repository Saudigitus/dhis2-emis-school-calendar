type EnumBorderType = "all" | "bottom" | "top"

interface WithBorderProps {
    children?: React.ReactNode
    type: EnumBorderType
}
export { type WithBorderProps }