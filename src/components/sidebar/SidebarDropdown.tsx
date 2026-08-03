import React from "react";
import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import type { D2I18n } from "dhis2-semis-types";

export type SidebarOption = "non-school-days" | "term1" | "term2" | "term3";

interface SidebarDropdownProps {
    i18n: D2I18n;
    value: SidebarOption;
    onChange: (value: SidebarOption) => void;
    termLabels?: string[];
}

export default function SidebarDropdown({ i18n, value, onChange, termLabels }: SidebarDropdownProps) {
    const options = [
        { value: "non-school-days", label: i18n.t("Non-school days") },
        { value: "term1", label: termLabels?.[0] || i18n.t("Term 1") },
        { value: "term2", label: termLabels?.[1] || i18n.t("Term 2") },
        { value: "term3", label: termLabels?.[2] || i18n.t("Term 3") },
    ];

    return (
        <SingleSelectField
            selected={value}
            onChange={(e: any) => onChange(e.selected as SidebarOption)}
            label=""
        >
            {options.map((opt) => (
                <SingleSelectOption
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                />
            ))}
        </SingleSelectField>
    );
}
