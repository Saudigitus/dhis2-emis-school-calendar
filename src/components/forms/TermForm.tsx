import React, { useRef, useState, useEffect } from "react";
import style from "./termForm.module.css";
import { WithPadding } from "../template";
import { FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"
import { ButtonStrip, Button } from '@dhis2/ui'
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { ClassPeriodType } from "../../types/dataStore/DataStoreConfig";
import { termsFormData, termsInitalValues } from "../../utils/constants/termsFormData";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";

function TermForm(): React.ReactElement {
    const location = useLocation()
    const dataStoreRecord = useRecoilValue(DataStoreState)
    const classPeriod = dataStoreRecord?.classPeriods?.find((x: ClassPeriodType) => x.key === location.pathname.slice(1))
    const [initialValues, setInitailValues] = useState<object>({ ...termsInitalValues(classPeriod?.startDate, classPeriod?.endDate) })
    const { postData, loading, } = dataStoreManagement()
    const [disabled, setDisabled] = useState<boolean>(true)
    const [clickedButton, setClickedButton] = useState<string>("");
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const [values, setValues] = useState<Record<string, string>>({ ...initialValues })

    useEffect(() => {
        setInitailValues({ ...termsInitalValues(classPeriod?.startDate, classPeriod?.endDate) })
    }, [classPeriod])

    useEffect(() => {
        if (clickedButton === "save")
            setDisabled(true)
    }, [loading])

    const modalActions = [
        { id: "enable", type: "button", label: "Edit", primary: true, disabled: false, onClick: () => { setDisabled(!disabled); setClickedButton("enable") }, display: disabled },
        { id: "cancel", type: "button", label: "Cancel", secondary: true, disabled: false, onClick: () => { setDisabled(!disabled); setClickedButton("cancel") }, display: !disabled },
        { id: "save", type: "submit", label: "Save", primary: true, disabled: false, onClick: () => { setClickedButton("save") }, display: !disabled }
    ];

    const formatClassPeriods = (data: ClassPeriodType[], values: any, selectedTermKey: string) => {
        const selectedTermIndex = data.findIndex((x: ClassPeriodType) => x.key === selectedTermKey);

        if (selectedTermIndex === -1)
            return data;

        const updatedSelectedTerm = {
            ...data[selectedTermIndex],
            startDate: values['class_startdate'],
            endDate: values['class_enddate']
        };

        const newData = [...data];
        newData[selectedTermIndex] = updatedSelectedTerm;

        return newData;
    }

    function onSubmit() {
        void postData({
            ...dataStoreRecord,
            classPeriods: formatClassPeriods(dataStoreRecord.classPeriods, values, classPeriod?.key)
        }, 'Data updated successfully')
    }

    function onChange(changeValues: any) {
        setValues(changeValues)
    }

    return (
        <WithPadding padding="5px">
            <Form initialValues={{ ...initialValues }} onSubmit={onSubmit}>
                {({ handleSubmit, values, form }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={onChange(values) as unknown as () => void}
                    >
                        {termsFormData(disabled)?.map((section: FormSectionProps, index: number) => {
                            return (
                                <GroupForm
                                    key={index}
                                    name={classPeriod?.description}
                                    fields={section.fields}
                                    disabled={disabled}
                                />
                            )
                        })}
                        <ButtonStrip start className="mr-4">
                            {modalActions?.filter((action) => action.display).map((action, i) => {
                                return (
                                    <>
                                        {

                                            <Button
                                                key={i}
                                                loading={loading}
                                                {...action}
                                            >
                                                {action.label}
                                            </Button>
                                        }
                                    </>
                                )
                            })}
                        </ButtonStrip>
                    </form>
                }}

            </Form>
        </WithPadding>
    );
}
export default TermForm;
