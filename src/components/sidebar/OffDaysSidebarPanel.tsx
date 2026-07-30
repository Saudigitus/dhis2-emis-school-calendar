import React, { useState } from "react";
import styles from "./OffDaysSidebarPanel.module.css";
import { Form } from "react-final-form";
import { Button, ButtonStrip, InputField, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { useRecoilValue } from "recoil";
import { SchoolCalendarData } from "dhis2-semis-components";
import { useParams } from "react-router-dom";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";
import { mergeHoliday } from "../../utils/common/mergeHoliday";
import type { D2I18n } from "dhis2-semis-types";

interface OffDaysSidebarPanelProps {
    i18n: D2I18n;
}

const OFF_DAY_TYPES = [
    { value: "public_holiday", label: "Public Holiday" },
    { value: "special_events", label: "Special Events" },
];

export default function OffDaysSidebarPanel({ i18n }: OffDaysSidebarPanelProps) {
    const { id } = useParams();
    const { postData, posting } = dataStoreManagement();
    const dataStoreData = useRecoilValue(SchoolCalendarData);
    const [showAddForm, setShowAddForm] = useState(false);

    const currentCalendar = dataStoreData?.schoolCalendar?.find((x: any) => x.id === id);
    const holidays = currentCalendar?.holidays || [];

    const onFormSubmit = (values: any) => {
        if (!currentCalendar) return;

        postData(
            {
                ...dataStoreData,
                schoolCalendar: [
                    { ...mergeHoliday(currentCalendar, values) },
                    ...dataStoreData.schoolCalendar.filter((x: any) => x.id !== id),
                ],
            },
            i18n.t("Off day registered successfully")
        ).then(() => {
            setShowAddForm(false);
        });
    };

    return (
        <div className={styles.offDaysPanel}>
            <div className={styles.header}>
                <span className={styles.title}>{i18n.t("Off-days")}</span>
                {!showAddForm && (
                    <Button
                        small
                        onClick={() => setShowAddForm(true)}
                    >
                        +
                    </Button>
                )}
            </div>

            {showAddForm && (
                <div className={styles.addForm}>
                    <div className={styles.addFormTitle}>{i18n.t("Add new")}</div>
                    <Form onSubmit={onFormSubmit}>
                        {({ handleSubmit, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formField}>
                                    <InputField
                                        label={i18n.t("Date")}
                                        type="date"
                                        name="date"
                                    />
                                </div>

                                <div className={styles.formField}>
                                    <SingleSelectField
                                        label={i18n.t("Type")}
                                        name="type"
                                        selected=""
                                        onChange={() => {}}
                                    >
                                        {OFF_DAY_TYPES.map((t) => (
                                            <SingleSelectOption
                                                key={t.value}
                                                label={t.label}
                                                value={t.value}
                                            />
                                        ))}
                                    </SingleSelectField>
                                </div>

                                <div className={styles.formField}>
                                    <InputField
                                        label={i18n.t("Description")}
                                        type="text"
                                        name="event"
                                        placeholder={i18n.t("Non-schoolday description")}
                                    />
                                </div>

                                <div className={styles.formActions}>
                                    <Button
                                        small
                                        onClick={() => setShowAddForm(false)}
                                    >
                                        {i18n.t("Cancel")}
                                    </Button>
                                    <Button
                                        small
                                        primary
                                        type="submit"
                                        disabled={posting}
                                    >
                                        {i18n.t("Save")}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Form>
                </div>
            )}

            <div className={styles.list}>
                {holidays.map((holiday: any, index: number) => (
                    <div key={index} className={styles.offDayCard}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>{holiday.event}</div>
                            <div className={styles.cardMeta}>
                                <span className={styles.cardType}>{holiday.type}</span>
                                <span className={styles.cardDate}>{holiday.date}</span>
                            </div>
                        </div>
                        <Button
                            small
                            secondary
                            onClick={() => {}}
                        >
                            ···
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
