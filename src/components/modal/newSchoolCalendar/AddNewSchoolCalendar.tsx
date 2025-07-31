import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import GroupForm from "../../form/GroupForm";
import fieldsSchoolDetails from "../../../utils/constants/fieldsSchoolDetails.json";
import i18n from "../../../locales";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";
import { generateId } from "../../../utils/common/generateId";
import { updateSchoolConfig } from "../../../utils/common/updateSchoolConfig";
import { schoolCalendar } from "../../../types/dataStore/DataStoreConfig";
import { SchoolCalendarData } from "dhis2-semis-components";
interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    refetch?: () => void,
    academicYearValues: schoolCalendar['academicYear']
}

export default function AddNewSchoolCalendar({ setOpen, selected, refetch, academicYearValues }: ContentProps) {
    const { postData, loading } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData)
    const { loading: loadingAC, data, getAcademicYear } = useGetAcademicYears()


    useEffect(() => {
        getAcademicYear()
    }, [])

    const modalActions = [
        {
            id: "cancel",
            type: "button",
            label: i18n.t("Cancel"),
            white: true
        },
        {
            id: "save",
            type: "button",
            label: i18n.t("Save"),
            primary: true,
            icon: loading && <CircularLoader small />
        }
    ];

    function actions(action: string, values: any) {
        switch (action) {
            case "cancel":
                setOpen(false)
                break
            case "save":
                if (selected) {
                    const currentData = dataStoreData?.schoolCalendar?.find((item: any) => item.id == selected) as unknown as SchoolConfig
                    console.log(dataStoreData)
                    if (currentData) {
                        const updatedData = updateSchoolConfig(currentData, {
                            academicYear: { ...values, label: data?.find((x) => x.value === values["code"])?.label }
                        });
                        postData({
                            ...dataStoreData, schoolCalendar: [updatedData, ...dataStoreData.schoolCalendar.filter((x) => {
                                if (x.id !== selected) {
                                    return x;
                                }
                            })]
                        }, i18n.t("School calendar updated successfully"));
                    }
                } else {
                    const currentData = updateSchoolConfig({}, {
                        academicYear: { ...values, label: data?.find((x) => x.value === values["code"])?.label },
                        id: generateId(),
                        weekDays: {
                            "friday": false,
                            "monday": false,
                            "saturday": false,
                            "sunday": false,
                            "thursday": false,
                            "tuesday": false,
                            "wednesday": false
                        }
                    })
                    postData({ ...dataStoreData, schoolCalendar: [...dataStoreData.schoolCalendar, currentData] }, i18n.t("School calendar updated successfully"));
                }
                break
        }
    }

    // addAcademicYearOptions as options to fieldsSchoolDetails and return the updated fieldsSchoolDetails
    function addAcademicYearOptions() {
        const academicYearOptions = data?.map((item: any) => ({
            value: item.value,
            label: item.label
        })) || [];

        return fieldsSchoolDetails.map((field: any) => {
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
                {i18n.t("To register new school calendar, please fill out the form")}
            </span>
            <Form initialValues={academicYearValues} onSubmit={() => { }}>
                {({ values, pristine, valid }) => {
                    return (
                        <form>
                            <br />

                            {loadingAC ?
                                <CenteredContent><CircularLoader /></CenteredContent>
                                :
                                <GroupForm
                                    name={i18n.t("Off Day Details")}
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
                                        <Button key={i} disabled={action.id == "cancel" ? loading : (loading || pristine)} {...action} onClick={(e: any) => {
                                            if (valid) {
                                                actions(action.id, values)
                                            } else if (action.id === "cancel") {
                                                setOpen(false);
                                            }
                                        }}>
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
