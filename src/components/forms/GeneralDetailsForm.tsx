import React, { useRef, useEffect, useState } from "react";
import { WithPadding } from "../template";
import { generalDetailsFormData } from "../../utils/constants/generalDetailsFormData";
import { Form } from "react-final-form"
import { useRecoilValue } from "recoil";
import { dataStoreManagement } from "../../hooks/dataStore/useDSManagement";
import { useParams } from "react-router-dom";
import { type FormSectionProps } from "../../types/form/FormSectionProps";
import { type dataStoreRecord } from "../../types/dataStore/DataStoreConfig";
import GroupForm from "../groupForm/GroupForm";
import { SchoolCalendarData } from "dhis2-semis-components";
import { useDataStore } from "../../hooks/appwarapper/useDataStore";
import { LinearProgress } from "@mui/material";

function GeneralDetailsForm(): React.ReactElement {
    const { id } = useParams();
    const formRef = useRef<any>(null);
    const { loading } = useDataStore()
    const { postData, posting } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData);
    const [debouncedValues, setDebouncedValues] = useState<any>(null);

    function getValues(
        formValues: dataStoreRecord['schoolCalendar'] | dataStoreRecord['academicYear'],
        dataStoreKey: any
    ) {
        const updatedValues: any = {};
        Object.keys(dataStoreKey).forEach((key: any) => {
            if (formValues?.hasOwnProperty(key)) {
                updatedValues[key] = formValues[key];
            }
        });
        return updatedValues;
    }

    // Debounced save
    useEffect(() => {
        if (!debouncedValues) return;

        const current = dataStoreData?.schoolCalendar?.find((x) => x.id === id);
        const updated = {
            ...current,
            weekDays: getValues(debouncedValues, current?.weekDays || {}),
            academicYear: getValues(debouncedValues, current?.academicYear)
        };

        postData(
            {
                ...dataStoreData,
                schoolCalendar: dataStoreData?.schoolCalendar.map((x) =>
                    x.id === id ? updated : x
                )
            },
            'Data updated successfully'
        );

    }, [debouncedValues]);

    console.log(dataStoreData?.schoolCalendar?.find((x) => x.id === id), "generalDetailsFormData")

    return (
        <WithPadding padding="5px 15px">
            {(loading || posting) && <LinearProgress />}
            <div className="col-6">
                <Form
                    initialValues={{
                        ...(dataStoreData?.schoolCalendar?.find((x) => x.id === id)?.weekDays ?? {}),
                        ...(dataStoreData?.schoolCalendar?.find((x) => x.id === id)?.academicYear ?? {})
                    }}
                    onSubmit={() => { }}
                >
                    {({ handleSubmit, values, form }) => {
                        formRef.current = form;


                        return (
                            <form
                                onSubmit={handleSubmit}
                                onBlur={() => setDebouncedValues(values)} // só atualiza o estado (não salva ainda)
                            >
                                {generalDetailsFormData()?.map((section: FormSectionProps, index: number) => (
                                    <>
                                        <GroupForm
                                            key={index}
                                            name={section.section}
                                            fields={section.fields}
                                            disabled={section.disabled}
                                        />
                                    </>
                                ))}
                            </form>
                        );
                    }}
                </Form>
            </div>
        </WithPadding>
    );
}

export default GeneralDetailsForm;
