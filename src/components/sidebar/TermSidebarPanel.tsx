import React from "react";
import styles from "./TermSidebarPanel.module.css";
import { InputField } from "@dhis2/ui";
import type { D2I18n } from "dhis2-semis-types";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";

interface TermSidebarPanelProps {
    i18n: D2I18n;
    termIndex: number;
    classPeriods: schoolCalendar["classPeriods"];
}

function formatDateForInput(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
}

export default function TermSidebarPanel({ i18n, termIndex, classPeriods }: TermSidebarPanelProps) {
    const period = classPeriods?.[termIndex];

    const classDaysStart = formatDateForInput(period?.startDate || "");
    const classDaysEnd = formatDateForInput(period?.endDate || "");

    return (
        <div className={styles.termPanel}>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>{i18n.t("Class days")}</div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("Start date")}
                        type="date"
                        value={classDaysStart}
                        readOnly
                    />
                </div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("End date")}
                        type="date"
                        value={classDaysEnd}
                        readOnly
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>{i18n.t("Exam days")}</div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("Start date")}
                        type="date"
                        readOnly
                    />
                </div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("End date")}
                        type="date"
                        readOnly
                    />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>{i18n.t("Break days")}</div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("Start date")}
                        type="date"
                        readOnly
                    />
                </div>
                <div className={styles.field}>
                    <InputField
                        label={i18n.t("End date")}
                        type="date"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}
