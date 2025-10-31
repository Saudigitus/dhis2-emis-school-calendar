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
import { Button } from "@dhis2/ui";
import { ButtonStrip } from "@dhis2/ui";
import { CircularLoader } from "@dhis2/ui";
import i18n from "../../locales";
import { D2I18n } from "dhis2-semis-types";

function GeneralDetailsForm({ i18next }: { i18next: D2I18n }): React.ReactElement {
    const i18nLocal = i18next ?? i18n
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

    const onSubmit = () => {
        const current = dataStoreData?.schoolCalendar?.find((x:any) => x.id === id);
        const updated = {
            ...current,
            weekDays: getValues(debouncedValues, current?.weekDays || {}),
            academicYear: getValues(debouncedValues, current?.academicYear)
        };

        postData(
            {
                ...dataStoreData,
                schoolCalendar: dataStoreData?.schoolCalendar.map((x:any) =>
                    x.id === id ? updated : x
                )
            },
            i18nLocal.t('Data updated successfully')
        );

    }

    // Debounced save
    // useEffect(() => {
    //     if (!debouncedValues) return;

    //     const current = dataStoreData?.schoolCalendar?.find((x) => x.id === id);
    //     const updated = {
    //         ...current,
    //         weekDays: getValues(debouncedValues, current?.weekDays || {}),
    //         academicYear: getValues(debouncedValues, current?.academicYear)
    //     };

    //     postData(
    //         {
    //             ...dataStoreData,
    //             schoolCalendar: dataStoreData?.schoolCalendar.map((x) =>
    //                 x.id === id ? updated : x
    //             )
    //         },
    //         'Data updated successfully'
    //     );

    // }, [debouncedValues]);

    return (
        <WithPadding padding="5px 15px">
            {(loading || posting) && <LinearProgress />}
            <div className="col-6">
                <Form
                    initialValues={{
                        ...(dataStoreData?.schoolCalendar?.find((x:any) => x.id === id)?.weekDays ?? {}),
                        ...(dataStoreData?.schoolCalendar?.find((x:any) => x.id === id)?.academicYear ?? {})
                    }}
                    onSubmit={() => { }}
                >
                    {({ handleSubmit, values, form, pristine }) => {
                        formRef.current = form;


                        return (
                            <form
                                onSubmit={handleSubmit}
                                onBlur={() => setDebouncedValues(values)} // só atualiza o estado (não salva ainda)
                            >
                                {generalDetailsFormData(i18nLocal)?.map((section: FormSectionProps, index: number) => (
                                    <GroupForm
                                        key={index}
                                        name={section.section}
                                        fields={section.fields}
                                        disabled={section.disabled}
                                    />
                                ))}
                                <ButtonStrip>
                                    <Button
                                        disabled={(posting || loading || pristine)}
                                        onClick={() => form.reset()}
                                    >
                                        {i18nLocal.t("Cancel")}
                                    </Button>
                                    <Button
                                        icon={(posting || loading) && <CircularLoader small />}
                                        primary
                                        disabled={(posting || loading || pristine)}
                                        onClick={onSubmit}
                                    >
                                        {i18nLocal.t("Save")}
                                    </Button>
                                </ButtonStrip>
                            </form>
                        );
                    }}
                </Form>
            </div>
        </WithPadding>
    );
}

export default GeneralDetailsForm;
