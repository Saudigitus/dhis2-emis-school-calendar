import React from "react";
import OffDaysCard from "../../card/CardComponent";
import style from './GridView.module.css'
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import { getDisplayName } from "../../../utils/common/getTypeName";
import ClassPeriodsCard from "../../card/ClassPeriodsCard";

interface GridViewProps {
    classPeriods: schoolCalendar['classPeriods']
    setOpen: (value: boolean) => void
}

const GridViewComponentTerm = (props: GridViewProps): React.ReactElement => {
    const {
        classPeriods,
        setOpen
    } = props;

    return (
        <div className={style.list}>
            {classPeriods.map((classPeriod, index) => (
                <div>
                    <ClassPeriodsCard
                        classPeriods={classPeriod}
                        setOpen={setOpen}
                        index={index}
                    />
                </div>
            ))}
        </div>
    );
};

export default GridViewComponentTerm;
