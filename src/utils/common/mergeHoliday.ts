type NewHoliday = {
    date: string;
    type: string;
    event: string;
    index?: number;
};

export function mergeHoliday(
    original: SchoolConfig,
    newHolidayWrapper: NewHoliday
): SchoolConfig {
    const { date, type, event } = newHolidayWrapper;

    const holidayIndex = original.holidays?.findIndex(h => h.date === date) || -1;

    const updatedHoliday: Holiday = {
        date,
        type,
        event,
    };

    let updatedHolidays: Holiday[];

    if (holidayIndex >= 0) {
        // Atualizar o feriado existente
        updatedHolidays = [...(original.holidays || [])];
        updatedHolidays[holidayIndex] = updatedHoliday;
    } else {
        // Adicionar um novo feriado
        updatedHolidays = [...(original.holidays || []), updatedHoliday];
    }

    return {
        ...original,
        holidays: updatedHolidays,
    };
}
