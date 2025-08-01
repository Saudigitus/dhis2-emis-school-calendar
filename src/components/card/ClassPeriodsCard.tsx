import { Box, Card } from "@dhis2/ui";
import React, { useState } from "react";
import style from "./Card.module.css";
import classNames from "classnames";
import MenuComponent from "../menu/menu";
import { schoolCalendar } from "../../types/dataStore/DataStoreConfig";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SchoolCalendarData } from "dhis2-semis-components";
import { useParams } from "react-router-dom";
import { removeTerm } from "../../utils/common/removeTerm";
import { deleteState } from "../../schema/deleteDataSchema";

export default function ClassPeriodsCard({ classPeriods, setOpen, index }: { classPeriods: schoolCalendar['classPeriods'][0], setOpen: any, index: number }): React.ReactElement {
  const { description, endDate, key, startDate, } = classPeriods
  const { id } = useParams();
  const { postData, posting } = dataStoreManagement()
  const dataStoreData = useRecoilValue(SchoolCalendarData)
  const deletedTerm = useSetRecoilState(deleteState)


  const deletePeriod = () => {
    const localData = dataStoreData.schoolCalendar?.find((x) => x.id === id) as unknown as SchoolConfig;

    postData({
      ...dataStoreData,
      schoolCalendar: [
        { ...removeTerm(localData, classPeriods) },
        ...dataStoreData.schoolCalendar.filter((x) => {
          if (x.id !== id) {
            return x;
          }
        })
      ]

    }, "Data registered successfully").then(() => {
      deletedTerm({ data: Object(), delete: false })
    })
  }

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
            onDelete={deletePeriod}
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
