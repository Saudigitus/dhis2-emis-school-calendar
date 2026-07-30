import React, { useEffect, useState } from "react";
import SidebarDropdown, { type SidebarOption } from "./SidebarDropdown";
import OffDaysSidebarPanel from "./OffDaysSidebarPanel";
import TermSidebarPanel from "./TermSidebarPanel";
import styles from "./SidebarPanel.module.css";
import type { D2I18n } from "dhis2-semis-types";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";

interface SidebarPanelProps {
    i18n: D2I18n;
    classPeriods: schoolCalendar["classPeriods"];
    initialSelected?: SidebarOption;
    onSelectedChange?: (value: SidebarOption) => void;
}

export default function SidebarPanel({ i18n, classPeriods, initialSelected, onSelectedChange }: SidebarPanelProps) {
    const [selected, setSelected] = useState<SidebarOption>(initialSelected || "non-school-days");

    useEffect(() => {
        if (initialSelected !== undefined) {
            setSelected(initialSelected);
        }
    }, [initialSelected]);

    const termLabels = classPeriods?.map((p) => p.description) || [];

    const handleChange = (value: SidebarOption) => {
        setSelected(value);
        if (onSelectedChange) {
            onSelectedChange(value);
        }
    };

    return (
        <div className={styles.sidebarPanel}>
            <SidebarDropdown
                i18n={i18n}
                value={selected}
                onChange={handleChange}
                termLabels={termLabels}
            />
        </div>
    );
}
