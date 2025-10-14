type NewTerm = {
    key: string;
    endDate: string;
    startDate?: string;
    description: string;
};

export function removeTerm(
    original: SchoolConfig,
    newTermWrapper: NewTerm
): SchoolConfig {
    const { key, endDate, startDate, description } = newTermWrapper;

    const termIndex = original.classPeriods?.findIndex(h => h.key === key);

    const newTermsList = original.classPeriods?.filter((_, i) => i !== termIndex);

    return {
        ...original,
        classPeriods: newTermsList,
    };
}