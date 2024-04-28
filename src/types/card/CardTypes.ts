interface DashboardCardProps {
    title: string
    subItem: CardSubItemProps[]
}

interface CardSubItemProps {
    title: string
    date: string
    offDayType: string
    disabled?: boolean
}


export type { DashboardCardProps, CardSubItemProps }
