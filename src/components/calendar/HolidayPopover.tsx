import React, { useRef } from "react";
import { Popover, Tag } from "@dhis2/ui";
import type { HolidayType } from "../../types/dataStore/DataStoreConfig";
import styles from "./HolidayPopover.module.css";
import type { D2I18n } from "dhis2-semis-types";
import { getLocale } from "../../utils/common/getLocale";
import { getDisplayName } from "../../utils/common/getTypeName";

interface HolidayPopoverProps {
    holiday: HolidayType;
    /** The element the popover anchors to */
    reference: React.RefObject<Element>;
    onClose: () => void;
    i18n: D2I18n;
}

export function HolidayPopover({ holiday, reference, onClose, i18n }: HolidayPopoverProps) {
    const formattedDate = new Date(holiday.date).toLocaleDateString(getLocale(i18n?.language), {
        timeZone: "UTC",
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const isNegative = /public|national/i.test(holiday.type);
    const isPositive = /optional|school/i.test(holiday.type);

    return (
        <Popover
            reference={reference}
            placement="bottom"
            arrow
            onClickOutside={onClose}
        >
            <div className={styles.popover}>
                <div className={styles.header}>
                    {/* <span className={styles.icon}> </span> */}
                    <span className={styles.title}>{holiday.event}</span>
                </div>

                <div className={styles.body}>
                    <div className={styles.row}>
                        <span className={styles.label}>{i18n.t("Date")}</span>
                        <span className={styles.value}>{formattedDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{i18n.t("Type")}</span>
                        <Tag
                            negative={isNegative}
                            positive={isPositive}
                            neutral={!isNegative && !isPositive}
                        >
                            {getDisplayName(holiday.type, i18n)}
                        </Tag>
                    </div>
                </div>
            </div>
        </Popover>
    );
}
