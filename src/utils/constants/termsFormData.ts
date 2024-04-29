import { FormSectionProps } from "../../types/form/FormSectionProps";
import { Attribute } from "../../types/generated/models";
import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";

export function termsFormData(): FormSectionProps[] {
    const sections = ["Class days", "Exam days", "Break days"]

    return sections.map((section: string) => ({
        section: section,
        description: "",
        disabled: false,
        fields: [
            {
                id: `startdate${section}`,
                displayName: "Start date",
                header: "",
                required: false,
                name: `startdate${section}`,
                labelName: "Start date",
                valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                visible: true,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: "",
                unique: true,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            },
            {
                id: `enddate${section}`,
                displayName: "End date",
                header: "",
                required: false,
                name: `enddate${section}`,
                labelName: "End date",
                valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                visible: true,
                disabled: false,
                pattern: '',
                searchable: false,
                error: false,
                content: '',
                key: "",
                unique: true,
                displayInFilters: true,
                type: VariablesTypes.Attribute
            }
        ]
    }));

}