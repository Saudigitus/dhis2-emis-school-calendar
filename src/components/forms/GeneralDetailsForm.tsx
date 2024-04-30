import React, {useRef} from "react";
import {WithPadding} from "../template";
import {generalDetailsFormData} from "../../utils/constants/generalDetailsFormData";
import {type FormSectionProps} from "../../types/form/FormSectionProps";
import GroupForm from "../groupForm/GroupForm";
import {Form} from "react-final-form"
import {useRecoilValue, useSetRecoilState} from "recoil";
import {DataStoreState} from "../../schema/dataStoreSchema";
import {dataStoreManagement} from "../../hooks/dataStore/useDSManagement";
import {type dataStoreRecord} from "../../types/dataStore/DataStoreConfig";
import {showFeedBackState} from "../../schema/responseSchema";

function GeneralDetailsForm(): React.ReactElement {
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const dataStoreData = useRecoilValue(DataStoreState)
    const {postData} = dataStoreManagement()
    const setFeedBak = useSetRecoilState(showFeedBackState)

    function getValues(formValues: dataStoreRecord['weekDays'] | dataStoreRecord ['academicYear'], dataStoreKey: any) {
        const updatedValues: any = {}

        Object.keys(dataStoreKey).forEach((key: any) => {
            // eslint-disable-next-line no-prototype-builtins
            if (formValues?.hasOwnProperty(key)) {
                updatedValues[key] = formValues[key];
            }
        });

        return updatedValues
    }

    function onChange(e: any, visited: any) {
        void postData({
            ...dataStoreData,
            weekDays: getValues(e, dataStoreData.weekDays),
            academicYear: getValues(e, dataStoreData.academicYear)
        }, 'Data saved successfuly')
    }

    return (
        <WithPadding padding="5px">
            <Form initialValues={{...dataStoreData.weekDays, ...dataStoreData.academicYear}} onSubmit={() => {
            }}>
                {({
                      handleSubmit,
                      values,
                      form,
                      visited
                  }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={() => {
                            onChange(values, visited)
                        }}
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
