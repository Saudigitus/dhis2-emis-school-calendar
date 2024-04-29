import React, { useRef } from "react";
import { WithPadding } from "../template";
import { generalDetailsFormData } from "../../utils/constants/generalDetailsFormData";
import {type FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"
import {useRecoilValue} from "recoil";
import {DataStoreState} from "../../schema/dataStoreSchema";
import {dataStoreManagement} from "../../hooks/dataStore/useDSManagement";

function GeneralDetailsForm(): React.ReactElement {
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const dataStoreData = useRecoilValue(DataStoreState)
    const {postData} = dataStoreManagement()

    function onSubmit() { }
    function onChange(e: any) {
        void postData({
            ...dataStoreData,
            weekDays: e
        })
    }

    return (
        <WithPadding padding="5px">
            <Form initialValues={dataStoreData.weekDays} onSubmit={onSubmit} >
                {({ handleSubmit, values, form }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={() => {onChange(values)}}
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
