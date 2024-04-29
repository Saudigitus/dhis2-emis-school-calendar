import React from "react";
import OffDaysCard from "../../card/CardComponent";
import style from './GridView.module.css'
import {type dataStoreRecord} from "../../../types/dataStore/DataStoreConfig";
import {getDisplayName} from "../../../utils/common/getTypeName";

interface GridViewProps {
    offDays: dataStoreRecord['holidays']
    setOpen: (value: boolean) => void
}

const GridViewComponent = (props: GridViewProps): React.ReactElement => {
    const {
        offDays,
        setOpen
    } = props;

    return (
        <div className={style.list}>
            {offDays.map((offDay, index) => (
                <div>
                    <OffDaysCard index={index} setOpen={setOpen} type={offDay.type} offDayType={getDisplayName(offDay.type)} title={offDay.event}
                                 date={offDay.date as unknown as string}/>
                </div>
            ))}
        </div>
    );
};

export default GridViewComponent;
