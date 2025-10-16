type WeekDays = {
    [day in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: boolean;
};

type Holiday = {
    date: string;
    type: string;
    event: string;
};

type ClassPeriod = {
    key: string;
    startDate: string;
    endDate: string;
    description: string;
};

type AcademicYear = {
    code: string;
    type: string;
    label: string;
    startDate: string;
    endDate: string;
    description: string;
    id?: string;
};

type SchoolConfig = {
    id?: string;
    holidays?: Holiday[];
    weekDays?: WeekDays;
    academicYear?: AcademicYear;
    classPeriods?: ClassPeriod[];
};
