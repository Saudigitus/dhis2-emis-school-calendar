type NewTerm = {
    key: string;
    endDate: string;
    startDate?: string;
    description: string;
};

export function mergeTerm(
    original: SchoolConfig,
    newTermWrapper: NewTerm
): SchoolConfig {
    const { key, endDate, startDate, description } = newTermWrapper;

    const termIndex = original.classPeriods?.findIndex(h => h.key === key);

    const updatedTerm: ClassPeriod = {
        key,
        endDate,
        startDate,
        description
    };

    let updatedTerms: ClassPeriod[];

    if (termIndex >= 0) {
        // Atualizar o term existente
        updatedTerms = [...(original.classPeriods || [])];
        updatedTerms[termIndex] = updatedTerm;
    } else {
        // Adicionar um novo term
        updatedTerms = [...(original.classPeriods || []), updatedTerm];
    }

    return {
        ...original,
        classPeriods: updatedTerms,
    };
}
