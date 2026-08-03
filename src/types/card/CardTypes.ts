import { D2I18n } from "dhis2-semis-types"

interface DashboardCardProps {
    title: string
    subItem: CardSubItemProps[]
}

interface CardSubItemProps {
    title: string
    date: string
    offDayType: string
    type: string
    disabled?: boolean
    index: number
    i18n: D2I18n
    scrollToTop?: any
}


export type { DashboardCardProps, CardSubItemProps }
