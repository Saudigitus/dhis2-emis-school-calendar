import React from "react";
import OffDaysCard from "../../../card/CardComponent";

interface GridViewProps {
  offDays: any [];
}

const GridViewComponent = (props: GridViewProps): React.ReactElement => {
  const { offDays } = props;

  return (
      <div className="d-flex justify-content-center w-100">
        <div className="row w-100 g-4">
          {offDays.map((template) => (
            <div className="col-12 col-sm-6 col-lg-3">
              <OffDaysCard offDayType={'keke'} title={'sdsdsd'} date={'1010-10-10'}/>
            </div>
          ))}
        </div>
      </div>
  );
};

export default GridViewComponent;
