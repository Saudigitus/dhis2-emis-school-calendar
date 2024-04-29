import React from "react";
import OffDaysCard from "../../card/CardComponent";
import style from './GridView.module.css'
import {type dataStoreRecord} from "../../../types/dataStore/DataStoreConfig";
import {getDisplayName} from "../../../utils/common/getTypeName";

interface GridViewProps {
  offDays: dataStoreRecord['holidays']
}

const GridViewComponent = (props: GridViewProps): React.ReactElement => {
  const { offDays } = props;

  return (
        <div className={style.list}>
          {offDays.map((offDay) => (
              // eslint-disable-next-line react/jsx-key
            <div >
              <OffDaysCard offDayType={getDisplayName(offDay.type)} title={offDay.event} date={offDay.date as unknown as string}/>
            </div>
          ))}
      </div>
  );
};

export default GridViewComponent;
