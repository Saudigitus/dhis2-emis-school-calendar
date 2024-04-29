import React from "react";
import OffDaysCard from "../../card/CardComponent";
import style from './GridView.module.css'
interface GridViewProps {
  offDays: any []
}

const GridViewComponent = (props: GridViewProps): React.ReactElement => {
  const { offDays } = props;

  return (
        <div className={style.list}>
          {offDays.map((template) => (
              // eslint-disable-next-line react/jsx-key
            <div >
              <OffDaysCard offDayType={'keke'} title={'sduuuuuuusdsd'} date={'1010-10-10'}/>
            </div>
          ))}
      </div>
  );
};

export default GridViewComponent;
