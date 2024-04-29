import { format } from "date-fns";
import { FormSectionProps } from "../../types/form/FormSectionProps";
import { Attribute } from "../../types/generated/models";
import { CustomAttributeProps, VariablesTypes } from "../../types/variables/AttributeColumns";

export function termsFormData(disabled: boolean): FormSectionProps[] {

    return [
        {
            section: "Class days",
            description: "",
            disabled: disabled,
            fields: [
                {
                    id: `class_startdate`,
                    displayName: "Start date",
                    header: "",
                    required: false,
                    name: `class_startdate`,
                    labelName: "Start date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                },
                {
                    id: `class_enddate`,
                    displayName: "End date",
                    header: "",
                    required: false,
                    name: `class_enddate`,
                    labelName: "End date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                }
            ]
        },
        {
            section: "Exam days",
            description: "",
            disabled: disabled,
            fields: [
                {
                    id: `exam_startdate`,
                    displayName: "Start date",
                    header: "",
                    required: false,
                    name: `exam_startdate`,
                    labelName: "Start date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                },
                {
                    id: `exam_enddate`,
                    displayName: "End date",
                    header: "",
                    required: false,
                    name: `exam_enddate`,
                    labelName: "End date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                }
            ]
        },
        {
            section:  "Break days",
            description: "",
            disabled: disabled,
            fields: [
                {
                    id: `break_startdate`,
                    displayName: "Start date",
                    header: "",
                    required: false,
                    name: `break_startdate`,
                    labelName: "Start date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                },
                {
                    id: `break_enddate`,
                    displayName: "End date",
                    header: "",
                    required: false,
                    name: `break_enddate`,
                    labelName: "End date",
                    valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
                    visible: true,
                    disabled: disabled,
                    pattern: '',
                    searchable: false,
                    error: false,
                    content: '',
                    key: "",
                    unique: true,
                    displayInFilters: true,
                    type: VariablesTypes.Attribute,
                    // assignedValue: format(new Date(), "yyyy-MM-dd")
                }
            ]
        }
    ]

}

export const termsInitalValues = {
    class_startdate: format(new Date(), "yyyy-MM-dd"),
    class_enddate: format(new Date(), "yyyy-MM-dd"),
    exam_startdate: format(new Date(), "yyyy-MM-dd"),
    exam_enddate: format(new Date(), "yyyy-MM-dd"),
    break_startdate: format(new Date(), "yyyy-MM-dd"),
    break_enddate: format(new Date(), "yyyy-MM-dd"),
}