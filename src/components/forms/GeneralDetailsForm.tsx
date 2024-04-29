import React, { useRef } from "react";
import { WithPadding } from "../template";
import { generalDetailsFormData } from "../../utils/constants/generalDetailsFormData";
import {type FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"

function GeneralDetailsForm(): React.ReactElement {
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
                        {generalDetailsFormData()?.map((section: FormSectionProps, index: number) => {
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
export default GeneralDetailsForm;
