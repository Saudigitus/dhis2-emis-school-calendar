import React, { useEffect, useState } from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import { Form } from "react-final-form";
import GroupForm from "../../form/GroupForm";
import fieldsSchoolDetails from "../../../utils/constants/fieldsSchoolDetails.json";
import i18n from "../../../locales";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useRecoilState, useRecoilValue } from "recoil";
import { DataStoreState } from "../../../schema/dataStoreSchema";
import { editState } from "../../../schema/editDataSchema";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";

interface ContentProps {
    setOpen: (value: boolean) => void
}

export default function AddNewSchoolCalendar({ setOpen }: ContentProps): React.ReactElement {
    const { postData, loading } = dataStoreManagement()
    const dataStoreData = useRecoilValue(DataStoreState)
    const [selectedCard, setSelectedCard] = useRecoilState(editState)
    const { loading: loadingAC, data, getAcademicYear } = useGetAcademicYears()
    const [typechanged, settypechanged] = useState("")

    useEffect(() => {
        if (typechanged) {
            getAcademicYear({ type: typechanged })
        }
    }, [typechanged])


    const modalActions = [
        {
            id: "cancel",
            type: "Cancel",
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
               console.log(values)
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
            if (field.name === "academicYear" && academicYearOptions.length > 0) {
                return {
                    ...field,
                    disabled: false,
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
            <Form initialValues={selectedCard.edit ? { date: selectedCard.data.date, type: selectedCard.data.type, event: selectedCard.data.title } : {}} onSubmit={() => {
            }}
            >
                {({ values, pristine }) => {
                    if (values["type"]) {
                        settypechanged(values["type"])
                    }
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
                                        <Button key={i} disabled={loading || pristine} {...action} onClick={(e: any) => {
                                            actions(action.id, values)
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
        </WithPadding>
    );
}
