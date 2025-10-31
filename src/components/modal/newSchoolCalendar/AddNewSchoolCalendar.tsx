import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import GroupForm from "../../form/GroupForm";
import { fieldsSchoolDetails } from "../../../utils/constants/fieldsSchoolDetails";
import i18n from "../../../locales";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";
import { generateId } from "../../../utils/common/generateId";
import { updateSchoolConfig } from "../../../utils/common/updateSchoolConfig";
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import { SchoolCalendarData } from "dhis2-semis-components";
import { D2I18n } from "dhis2-semis-types";

interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    academicYearValues: schoolCalendar['academicYear']
    i18next: D2I18n
}

export default function AddNewSchoolCalendar({ setOpen, selected, academicYearValues, i18next }: ContentProps) {
    const i18nLocal = i18n ?? i18next;
    const { postData, posting } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData)
    const { loading: loading, data, getAcademicYear } = useGetAcademicYears()

    useEffect(() => {
        getAcademicYear()
    }, [])

    const modalActions = [
        {
            id: "cancel",
            type: "button",
            label: i18nLocal.t("Cancel"),
            white: true,
            onClick: () => setOpen(false)
        },
        {
            id: "save",
            type: "submit",
            label: i18nLocal.t("Save"),
            primary: true,
            icon: posting && <CircularLoader small />
        }
    ];

    const onSubmit = (values: any) => {
        if (selected) {
            const currentData = dataStoreData?.schoolCalendar?.find((item: any) => item?.id == selected) as unknown as SchoolConfig
            if (currentData) {
                const updatedData = updateSchoolConfig(currentData, {
                    academicYear: { ...(values ? { ...values } : {}), label: data?.options?.find((x) => x?.value === values["code"])?.label }
                });
                postData({
                    ...dataStoreData, schoolCalendar: [updatedData, ...dataStoreData?.schoolCalendar.filter((x: any) => {
                        if (x.id !== selected) {
                            return x;
                        }
                    })]
                }, i18nLocal.t("School calendar updated successfully"))
                    .then(() => { setOpen(false) });
            }
        } else {
            const safeValues = (values && typeof values === "object" && !Array.isArray(values))
                ? values
                : {};

            const currentData = updateSchoolConfig({}, {
                academicYear: {
                    ...safeValues,
                    label: data?.options?.find((x) => x?.value === values?.code)?.label
                },
                id: generateId(),
                weekDays: {
                    friday: false,
                    monday: false,
                    saturday: false,
                    sunday: false,
                    thursday: false,
                    tuesday: false,
                    wednesday: false
                }
            });

            postData({
                ...dataStoreData, schoolCalendar: [...(
                    dataStoreData?.schoolCalendar ? dataStoreData?.schoolCalendar : []
                ), currentData]
            }, i18nLocal.t("School calendar updated successfully"))
                .then(() => { setOpen(false) });
        }
    }
    // addAcademicYearOptions as options to fieldsSchoolDetails and return the updated fieldsSchoolDetails
    function addAcademicYearOptions() {
        const academicYearOptions = data?.options?.map((item: any) => ({
            value: item.value,
            label: item.label
        })) || [];

        return fieldsSchoolDetails(i18nLocal).map((field: any) => {
            if (field.name === "code" && academicYearOptions.length > 0) {
                return {
                    ...field,
                    disabled: true,
                    "options": {
                        "optionSet": {
                            options: academicYearOptions
                        }
                    }
                };
            }
            return field;
        });
    }

    return (
        <WithPadding padding="0px">
            <span>
                {i18nLocal.t("To register new school calendar, please fill out the form")}
            </span>
            <Form initialValues={academicYearValues} onSubmit={onSubmit}>
                {({ values, handleSubmit, pristine, valid }) => {
                    return (
                        <form onSubmit={handleSubmit} >
                            <br />

                            {loading ?
                                <CenteredContent><CircularLoader /></CenteredContent>
                                :
                                <GroupForm
                                    name={i18nLocal.t("Off Day Details")}
                                    description={""}
                                    disabled={false}
                                    fields={addAcademicYearOptions().map((field: any) => ({
                                        type: field.type ?? "text", // or the appropriate default type
                                        ...field
                                    }))}
                                />
                            }
                            <br />
                            <ModalActions>
                                <ButtonStrip end>
                                    {modalActions.map((action, i) => (
                                        <Button key={i} disabled={action.id == "cancel" ? posting : (posting || pristine)} {...action} >
                                            {action.label}
                                        </Button>
                                    ))}
                                </ButtonStrip>
                            </ModalActions>
                        </form>
                    );
                }}
            </Form>
        </WithPadding >
    );
}