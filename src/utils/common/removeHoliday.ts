type NewHoliday = {
    date: string;
    type: string;
    event: string;
    index?: number;
};

export function removeHoliday(
    original: SchoolConfig,
    newTermWrapper: NewHoliday
): SchoolConfig {
    const { date, type, event, index } = newTermWrapper;

    const termIndex = original.holidays?.findIndex(h => h.date === date);

    const newTermsList = original.holidays?.filter((_, i) => i !== termIndex);

    return {
        ...original,
        holidays: newTermsList,
    };
}