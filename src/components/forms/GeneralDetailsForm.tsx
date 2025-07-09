import React, { useRef, useEffect } from "react";
import { WithPadding } from "../template";
import { generalDetailsFormData } from "../../utils/constants/generalDetailsFormData";
import { type FormSectionProps } from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import { Form } from "react-final-form"
import { useRecoilValue } from "recoil";
import { DataStoreState } from "../../schema/dataStoreSchema";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";
import { type dataStoreRecord } from "../../types/dataStore/DataStoreConfig";
import { useParams } from "react-router-dom";

function GeneralDetailsForm(): React.ReactElement {
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const dataStoreData = useRecoilValue(DataStoreState)
    const { postData } = dataStoreManagement()
    const { id } = useParams();

    function getValues(formValues: dataStoreRecord['weekDays'] | dataStoreRecord['academicYear'], dataStoreKey: any) {
        const updatedValues: any = {}

        Object.keys(dataStoreKey).forEach((key: any) => {
            // eslint-disable-next-line no-prototype-builtins
            if (formValues?.hasOwnProperty(key)) {
                updatedValues[key] = formValues[key];
            }
        });

        return updatedValues
    }

    function onChange(e: any) {
        void postData({
            ...dataStoreData.find((x) => x.id === id),
            weekDays: getValues(e, dataStoreData?.find((x) => x.id === id)?.weekDays || {}),
            academicYear: getValues(e, dataStoreData?.find((x) => x.id === id)?.academicYear)
        }, 'Data updated successfuly')
    }

    return (
        <WithPadding padding="5px">
            <Form initialValues={{ ...dataStoreData?.find((x) => x.id === id)?.weekDays, ...dataStoreData?.find((x) => x.id === id)?.academicYear }} onSubmit={() => {
            }}>
                {({ handleSubmit, values, form, initialValues }) => {
                    formRef.current = form;

                    useEffect(() => {
                        if (JSON.stringify(initialValues) !== JSON.stringify(values)) onChange(values)
                    }, [values])

                    return <form
                        onSubmit={handleSubmit}
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
