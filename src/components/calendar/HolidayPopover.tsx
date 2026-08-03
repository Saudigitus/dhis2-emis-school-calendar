import React, { useRef } from "react";
import { Popover, Tag } from "@dhis2/ui";
import type { HolidayType } from "../../types/dataStore/DataStoreConfig";
import styles from "./HolidayPopover.module.css";

interface HolidayPopoverProps {
    holiday: HolidayType;
    /** The element the popover anchors to */
    reference: React.RefObject<Element>;
    onClose: () => void;
}

export function HolidayPopover({ holiday, reference, onClose }: HolidayPopoverProps) {
    const formattedDate = new Date(holiday.date).toLocaleDateString("en-US", {
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
                        <span className={styles.label}>Date</span>
                        <span className={styles.value}>{formattedDate}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>Type</span>
                        <Tag
                            negative={isNegative}
                            positive={isPositive}
                            neutral={!isNegative && !isPositive}
                        >
                            {holiday.type}
                        </Tag>
                    </div>
                </div>
            </div>
        </Popover>
    );
}
