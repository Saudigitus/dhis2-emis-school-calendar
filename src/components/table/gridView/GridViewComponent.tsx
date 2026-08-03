import React from "react";
import OffDaysCard from "../../card/CardComponent";
import style from './GridView.module.css'
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import { getDisplayName } from "../../../utils/common/getTypeName";
import { D2I18n } from "dhis2-semis-types";

interface GridViewProps {
    offDays: schoolCalendar['holidays']
    i18n: D2I18n
    scrollToTop: () => void
}

const GridViewComponent = (props: GridViewProps): React.ReactElement => {
    const { offDays, i18n, scrollToTop } = props;

    return (
        <div className={style.list} >
            {offDays.map((offDay, index) => (
                <div style={{ width: "255px", margin: "auto" }}>
                    <OffDaysCard
                        scrollToTop={scrollToTop}
                        index={index}
                        type={offDay.type}
                        title={offDay.event}
                        date={offDay.date as unknown as string}
                        offDayType={getDisplayName(offDay.type, i18n)}
                        i18n={i18n}
                    />
                </div>
            ))}
        </div>
    );
};

export default GridViewComponent;