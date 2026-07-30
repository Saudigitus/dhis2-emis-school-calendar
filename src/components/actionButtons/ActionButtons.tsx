import React from "react";
import { Button } from "@dhis2/ui";
import styles from "./ActionButtons.module.css";
import type { D2I18n } from "dhis2-semis-types";

interface ActionButtonsProps {
    i18n: D2I18n;
    onSync?: () => void;
    onExportPDF?: () => void;
}

export default function ActionButtons({ i18n, onSync, onExportPDF }: ActionButtonsProps) {
    return (
        <div className={styles.actionButtons}>
            <Button
                className={styles.syncButton}
                onClick={onSync}
            >
                {i18n.t("Sync to all schools")}
            </Button>
            <Button
                className={styles.exportButton}
                onClick={onExportPDF}
            >
                {i18n.t("Export as a PDF")}
            </Button>
        </div>
    );
}
