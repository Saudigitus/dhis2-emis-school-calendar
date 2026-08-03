import React from "react";
import style from './GridView.module.css'
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import ClassPeriodsCard from "../../card/ClassPeriodsCard";
import { D2I18n } from "dhis2-semis-types";

interface GridViewProps {
    classPeriods: schoolCalendar['classPeriods']
    i18next: D2I18n
}

const GridViewComponentTerm = (props: GridViewProps): React.ReactElement => {
    const {
        classPeriods,
        i18next
    } = props;

    return (
        <div className={style.list}>
            {classPeriods.map((classPeriod, index) => (
                <div>
                    <ClassPeriodsCard
                        classPeriods={classPeriod}
                        index={index}
                        i18next={i18next}
                    />
                </div>
            ))}
        </div>
    );
};

export default GridViewComponentTerm;
