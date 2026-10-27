import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { SelectedPanelAtom } from "../../schema/selectedPanel";
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
    const { id } = useParams();
    const [selectedPanel, setSelectedPanel] = useRecoilState(SelectedPanelAtom);
    const selected = selectedPanel.id === id ? selectedPanel.panel : 'general-details';
    // a new key remounts the dropdown, which closes its menu after a choice
    const [menuKey, setMenuKey] = useState(0);
    const setSelected = (panel: string) => {
        setSelectedPanel({ id, panel });
        setMenuKey((key) => key + 1);
    };
    const options: any = [
        {
            label: i18n.t('General details'),
            onClick: () => setSelected('general-details'),
            divider: true,
            key: "general-details",
            disabled: false,
        },
        {
            label: i18n.t('School terms'),
            onClick: () => setSelected('terms'),
            divider: true,
            key: "terms",
            disabled: false,
        },
        {
            label: i18n.t('Non school days'),
            onClick: () => setSelected('non-school-days'),
            divider: true,
            key: "non-school-days",
            disabled: false,
        }
    ]

    return (
        <div className={styles.sidebarPanel}>
            <DropdownButton
                key={menuKey}
                name={<span className={styles.work_buttons_text}>{options?.find((x: any) => x.key == selected)?.label}</span> as unknown as string}
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
