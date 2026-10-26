type NewHoliday = {
    date: string;
    type: string;
    event: string;
    index?: number;
};

export function mergeHoliday(original: SchoolConfig, newHolidayWrapper: NewHoliday, originalDate?: string): SchoolConfig {
    const { date, type, event } = newHolidayWrapper;

    // when editing, replace the day that had the original date
    const holidayIndex = original.holidays?.findIndex(h => h.date === (originalDate ?? date));
    const updatedHoliday: Holiday = { date, type, event };
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
