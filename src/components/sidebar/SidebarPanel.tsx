import React, { useEffect, useState } from "react";
import styles from "./SidebarPanel.module.css";
import type { D2I18n } from "dhis2-semis-types";
import type { schoolCalendar } from "../../types/dataStore/DataStoreConfig";
import { CustomDropdown as DropdownButton } from 'dhis2-semis-components';
import { IconUserGroup16 } from "@dhis2/ui";
import GeneralDetailsForm from "../forms/GeneralDetailsForm";
import OffDaysList from "../offDaysList/OffDaysList";
import TermsList from "../termsList/TermsList";

interface SidebarPanelProps {
    i18n: D2I18n;
    classPeriods: schoolCalendar["classPeriods"];
    initialSelected?: string;
    onSelectedChange?: (value: string) => void;
}

export default function SidebarPanel({ i18n }: SidebarPanelProps) {
    const [selected, setSelected] = useState<string>('general-details');
    const options: any = [
        {
            label: <div style={{ minWidth: "180px" }} onClick={() => setSelected('general-details')} >
                {i18n.t('General details')}
            </div>,
            divider: true,
            key: "general-details",
            disabled: false,
        },
        {
            label: <div style={{ minWidth: "180px" }} onClick={() => setSelected('terms')} >
                {i18n.t('School terms')}
            </div>,
            divider: true,
            key: "terms",
            disabled: false,
        },
        {
            label: <div style={{ minWidth: "180px" }} onClick={() => setSelected('non-school-days')} >
                {i18n.t('Non school days')}
            </div>,
            divider: true,
            key: "non-school-days",
            disabled: false,
        }
    ]

    return (
        <div className={styles.sidebarPanel}>
            <DropdownButton
                name={<span className={styles.work_buttons_text}>{options?.find(x => x.key == selected)?.label}</span> as unknown as string}
                icon={<IconUserGroup16 />}
                options={options}
                fullWidth={true}
            />

            <div className={styles.container} >
                {selected == 'general-details' && <GeneralDetailsForm i18next={i18n} />}
                {selected == 'non-school-days' && <OffDaysList i18next={i18n} />}
                {selected == 'terms' && <TermsList i18next={i18n} />}
            </div>
        </div>
    );
}
