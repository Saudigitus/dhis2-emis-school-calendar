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
    setOpen: (value: boolean) => void | null
    index: number
}


export type { DashboardCardProps, CardSubItemProps }
