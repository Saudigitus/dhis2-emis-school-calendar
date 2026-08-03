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
import { GeneralLoadingState } from "../../schema/loadingSchema";
import { D2I18n } from "dhis2-semis-types";
import { SelectedTermAtom } from "../../schema/selectedTerm";

export default function ClassPeriodsCard({ classPeriods, index, i18next }: { classPeriods: schoolCalendar['classPeriods'][0], index: number, i18next: D2I18n }): React.ReactElement {
  const { description, endDate, key, startDate } = classPeriods
  const { id } = useParams();
  const { postData } = dataStoreManagement()
  const dataStoreData = useRecoilValue(SchoolCalendarData)
  const deletedTerm = useSetRecoilState(deleteState)
  const setLoading = useSetRecoilState(GeneralLoadingState)
  const setselectedTerm = useSetRecoilState(SelectedTermAtom);

  const deletePeriod = () => {
    setLoading(true)
    const localData = dataStoreData?.schoolCalendar?.find((x: any) => x.id === id) as unknown as SchoolConfig;

    postData({
      ...dataStoreData,
      schoolCalendar: [
        { ...removeTerm(localData, classPeriods) },
        ...dataStoreData?.schoolCalendar.filter((x: any) => {
          if (x.id !== id) {
            return x;
          }
        })
      ]

    }, i18next.t("Data registered successfully")).then(() => {
      deletedTerm({ data: Object(), delete: false })
    }).finally(() => setLoading(false))
  }

  return (
    <div onClick={() => {
      console.log(key)
      setselectedTerm(key)
    }} >
      <Card

        className={classNames(
          style.cardContainer
        )}
        key={index}
      >
        <div className={style.infoSection}>
          <span className={style.title} >{description}</span>
          <MenuComponent
            i18n={i18next}
            row={classPeriods}
            onDelete={deletePeriod}
          />
        </div>

        <div >
          <div className="mb-2 d-flex justify-content-between">
            <span style={{ fontSize: 14 }} className="text-secondary">{i18next.t("Start Date")}: </span> <span style={{ fontSize: 14 }} className={style.typenDate} >{startDate}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: 14 }} className="text-secondary">{i18next.t("End Date")}: </span> <span style={{ fontSize: 14 }} className={style.typenDate} >{endDate}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
