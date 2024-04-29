import React, { useRef, useState } from "react";
import style from "./termForm.module.css";
import { WithPadding } from "../template";
import { termsFormData, termsInitalValues } from "../../utils/constants/termsFormData";
import { FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"
import { ButtonStrip, Button } from '@dhis2/ui'

function TermForm(): React.ReactElement {
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const [initialValues] = useState<object>({ ...termsInitalValues })
    const [values, setValues] = useState<Record<string, string>>({...termsInitalValues})
    const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([])
    const [disabled, setDisabled] = useState<boolean>(true)

    const modalActions = [
        { id: "enable", type: "button", label: "Edit", primary: true, disabled: false, onClick: () => { setDisabled(!disabled) }, display: disabled },
        { id: "cancel", type: "button", label: "Cancel", secondary: true, disabled: false, onClick: () => { setDisabled(!disabled) }, display: !disabled },
        { id: "save", type: "submit", label: "Save", primary: true, disabled: false, onClick: () => { setDisabled(!disabled) }, display: !disabled }
    ];
    function onSubmit() { }

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
                                    name={section.section}
                                    fields={section.fields}
                                    disabled={section.disabled}
                                />
                            )
                        })}
                        <ButtonStrip start className="mr-4">
                            {modalActions?.filter((action)=> action.display).map((action, i) => {
                                return (
                                    <>
                                        {

                                            <Button
                                                key={i}
                                                loading={false}
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
