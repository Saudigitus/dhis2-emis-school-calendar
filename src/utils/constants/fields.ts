import {CustomAttributeProps} from "../../types/attributes/AttributeColumns";
import {Attribute} from "../../types/generated/models";

export const tableCols = (tableColumns: any): CustomAttributeProps[] => {

    return tableColumns?.length > 0 ? tableColumns : [
        {
            "id": "description",
            "displayName": "Description",
            "header": "Description",
            "required": true,
            "name": "description",
            "labelName": "Description",
            valueType: Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"],
            "visible": true,
            "disabled": false,
            "pattern": "",
            "searchable": true,
            "error": false,
            "content": "",
            "key": ""
        },
        {
            "id": "date",
            "displayName": "Date",
            "header": "Date",
            "required": true,
            "name": "date",
            "labelName": "Date",
            valueType: Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"],
            "visible": true,
            "disabled": false,
            "pattern": "",
            "searchable": true,
            "error": false,
            "content": "",
            "key": ""
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
            "description": "Non-Schoolday Type",
            "error": false,
            "content": "",
            "id": "type",
            "displayName": "Non-Schoolday Type",
            "header": "Type",
            searchable: true,
            key: '',
        },
        {
            "id": "actions",
            "displayName": "Actions",
            "header": "Actions",
            "required": true,
            "name": "actions",
            "labelName": "Actions",
            "visible": true,
            "disabled": false,
            "pattern": "",
            "searchable": true,
            "error": false,
            "content": "",
            "key": ""
        },
    ]
}
