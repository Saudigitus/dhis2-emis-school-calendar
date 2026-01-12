import React from "react";
import style from './GridView.module.css'
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import ClassPeriodsCard from "../../card/ClassPeriodsCard";
import { D2I18n } from "dhis2-semis-types";

interface GridViewProps {
    classPeriods: schoolCalendar['classPeriods']
    setOpen: (value: boolean) => void
    i18next: D2I18n
}

const GridViewComponentTerm = (props: GridViewProps): React.ReactElement => {
    const {
        classPeriods,
        setOpen,
        i18next
    } = props;

    return (
        <div className={style.list}>
            {classPeriods.map((classPeriod, index) => (
                <div>
                    <ClassPeriodsCard
                        classPeriods={classPeriod}
                        setOpen={setOpen}
                        index={index}
                        i18next={i18next}
                    />
                </div>
            ))}
        </div>
    );
};

export default GridViewComponentTerm;
