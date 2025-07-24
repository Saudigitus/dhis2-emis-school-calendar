import { Box, Card } from "@dhis2/ui";
import React, { useState } from "react";
import style from "./Card.module.css";
import classNames from "classnames";
import MenuComponent from "../menu/menu";
import { schoolCalendar } from "../../types/dataStore/DataStoreConfig";

export default function ClassPeriodsCard({ classPeriods, setOpen, index }: { classPeriods: schoolCalendar['classPeriods'][0], setOpen: any, index: number }): React.ReactElement {
  const { description, endDate, key, startDate, } = classPeriods
  const [selected, setSelected] = useState({})
  const [deleted, setDeleted] = useState(false)

  return (
    <>
      <Card
        className={classNames(
          style.cardContainer
        )}
        key={index}
      >
        <div className={style.infoSection}>
          <span className={style.title} >{description}</span>
          <MenuComponent
            setOpen={setOpen}
            row={classPeriods}
            setSelected={setSelected}
            setDeleted={setDeleted}
          />
        </div>

        <div >
          <div className="mb-2 d-flex justify-content-between">
            <span style={{ fontSize: 14 }} className="text-secondary">Start Date: </span> <span style={{ fontSize: 14 }} className={style.typenDate} >{startDate}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: 14 }} className="text-secondary">End Date: </span> <span style={{ fontSize: 14 }} className={style.typenDate} >{endDate}</span>
          </div>
        </div>
      </Card>
    </>
  );
}
