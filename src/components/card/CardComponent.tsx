/* eslint-disable react/prop-types */
import React from "react";
import classNames from "classnames";
import style from "./Card.module.css";
import { Card } from "@dhis2/ui";
import MenuComponent from "../menu/menu";
import { type CardSubItemProps } from "../../types/card/CardTypes";
import { useParams } from "react-router-dom";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SchoolCalendarData } from "dhis2-semis-components";
import { deleteState } from "../../schema/deleteDataSchema";
import { removeHoliday } from "../../utils/common/removeHoliday";

export default function OffDaysCard(offDay: CardSubItemProps): React.ReactElement {
  const { title, date, disabled, offDayType, i18n, scrollToTop } = offDay;
  const { id } = useParams();
  const { postData } = dataStoreManagement()
  const dataStoreData = useRecoilValue(SchoolCalendarData)
  const deletedTerm = useSetRecoilState(deleteState)


  const deletePeriod = () => {
    const localData = dataStoreData?.schoolCalendar?.find((x: any) => x.id === id) as unknown as SchoolConfig;

    postData({
      ...dataStoreData,
      schoolCalendar: [
        {
          ...removeHoliday(localData, {
            date: date,
            type: offDayType,
            event: title
            // index?: number;
          })
        },
        ...dataStoreData?.schoolCalendar.filter((x: any) => {
          if (x.id !== id) {
            return x;
          }
        })
      ]

    }, i18n.t("Data registered successfully")).then(() => {
      deletedTerm({ data: Object(), delete: false })
    })
  }

  return (
    <Card
      className={classNames(
        style.cardContainer,
        disabled === true && style.disabledCard
      )}
    >
      <div className={style.infoSection}>
        <span className={style.title} >{title}</span>
        <MenuComponent
          i18n={i18n}
          scrollToTop={scrollToTop}
          row={offDay}
          onDelete={deletePeriod}
        />
      </div>
      <div className={classNames(
        style.infoSection,
        style.lastSection
      )}>
        <span className={style.typenDate} >{offDayType}</span>
        <span className={style.typenDate} >{date}</span>
      </div>
    </Card>
  );
}
