import {CustomAttributeProps} from "../../types/attributes/AttributeColumns";
import {Attribute} from "../../types/generated/models";

export const tableCols = (tableColumns: any): CustomAttributeProps[] => {
    return tableColumns?.length > 0 ? tableColumns : [
        {
            "required": true,
            "name": "date",
            "labelName": "Date",
            "Placeholder": "Date",
            valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
            "disabled": false,
            "pattern": "",
            "visible": true,
            "description": "Date",
            "id": "date",
            "displayName": "Date",
            options: undefined,
            searchable: false,
            error: false,
            content: '',
            key: '',

        },
        {
            "required": true,
            "name": "type",
            "labelName": "Type",
            "Placeholder": "Non-Schoolday Type",
            valueType: Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"],
            "options": {
                "optionSet": {
                    "options": [
                        {
                            "value": "2023",
                            "label": "2022-2023"
                        },
                        {
                            "value": "2022",
                            "label": "2021-2022"
                        },
                        {
                            "value": "2021",
                            "label": "2020-2021"
                        }
                    ]
                }
            },
            "disabled": false,
            "visible": true,
            "description": "Type",
            "error": false,
            "content": "",
            "id": "Type",
            "displayName": "Type",
            "header": "Type",
            searchable: false,
            key: '',
        },
        {
            "required": true,
            "name": "description",
            "labelName": "Description",
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            "disabled": false,
            "pattern": "",
            "visible": true,
            "description": "Description",
            "searchable": false,
            "error": false,
            "programStage": "",
            "content": "",
            "id": "Description",
            "displayName": "Description",
            "header": "Description",
            options: undefined,
            key: '',
        }
    ]
}
