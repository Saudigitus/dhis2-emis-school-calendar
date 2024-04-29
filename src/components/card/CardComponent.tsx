/* eslint-disable react/prop-types */
import { Box, Card } from "@dhis2/ui";
import React from "react";
import style from "./Card.module.css";
import { MoreHoriz } from "@material-ui/icons";
import classNames from "classnames";
import { type CardSubItemProps } from "../../types/card/CardTypes";
import MenuComponent from "../menu/menu";

export default function OffDaysCard(props: CardSubItemProps): React.ReactElement {
  const { title, date, disabled, offDayType } = props;

  return (
    <Box>
      <Card
        className={classNames(
          style.cardContainer,
          disabled === true && style.disabledCard
        )}
      >
          <div className={style.infoSection}>
              <span className={style.title} >{title}</span>
              <MenuComponent row={{}} />
          </div>
          <div className={classNames(
              style.infoSection,
              style.lastSection
          )}>
              <span className={style.typenDate} >{offDayType}</span>
             <span className={style.typenDate} >{date}</span>
          </div>
      </Card>
    </Box>
  );
}
