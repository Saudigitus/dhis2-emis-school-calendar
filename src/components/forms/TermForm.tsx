import React, { useRef } from "react";
import style from "./termForm.module.css";
import { WithPadding } from "../template";
import { termsFormData } from "../../utils/constants/termsFormData";
import { FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"

function TermForm(): React.ReactElement {
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

    function onSubmit() { }
    function onChange() { }

    return (
        <WithPadding padding="5px">
            <Form initialValues={{}} onSubmit={onSubmit}>
                {({ handleSubmit, values, form }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={onChange() as unknown as () => void}
                    >
                        {termsFormData()?.map((section: FormSectionProps, index: number) => {
                            return (
                                <GroupForm
                                    key={index}
                                    name={section.section}
                                    fields={section.fields}
                                    disabled={section.disabled}
                                />
                            )
                        })}
                    </form>
                }}
            </Form>
        </WithPadding>
    );
}
export default TermForm;
