import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import GroupForm from "../../form/GroupForm";
import fieldsOptions from "../../../utils/constants/fieldsOptions.json";
import i18n from "../../../locales";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";
import { DataStoreState } from "dhis2-semis-components";
import { ValuesDataStoreState } from "../../../schema/valuesDataStoreSchema";
import { usePostOption } from "../../../hooks/option/usePostOption";
import useShowAlerts from "../../../hooks/commons/useShowAlert";

interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    refetch?: () => void,
}

export default function AddNewOption({ setOpen, selected }: ContentProps) {
    // const { postData, posting } = dataStoreManagement()
    const { show, hide } = useShowAlerts()
    const { postOption, loading: posting } = usePostOption()
    const valuesDataStore = useRecoilValue(ValuesDataStoreState)
    const { loading: loadingAC, data, getAcademicYear, refetch } = useGetAcademicYears()

    useEffect(() => {
        getAcademicYear(valuesDataStore)
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
            icon: posting && <CircularLoader small />
        }
    ];

    function actions(action: string, values: any) {
        switch (action) {
            case "cancel":
                setOpen(false)
                break
            case "save":
                if (data?.options?.some((opt) => opt.value === values?.code)) {
                    show({
                        message: `${("Could not get data")}: typed code already exist.`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 1000);
                }
                else {
                    refetch(valuesDataStore)
                    getAcademicYear(valuesDataStore)
                    postOption({
                        ...values,
                        optionSet: { id: data?.id }
                    },
                        "")
                        .then(() => {
                            refetch(valuesDataStore)
                            setOpen(false)
                        })
                }
                break
        }
    }

    // addAcademicYearOptions as options to fieldsOptions and return the updated fieldsOptions

    return (
        <WithPadding padding="0px">
            <span>
                {i18n.t("To register new option, please fill out the form")}
            </span>

            <Form onSubmit={() => { }}>
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
                                    fields={fieldsOptions.map((field: any) => ({
                                        type: field.type ?? "text",
                                        ...field
                                    }))}
                                />
                            }
                            <br />
                            <ModalActions>
                                <ButtonStrip end>
                                    {modalActions.map((action, i) => (
                                        <Button key={i} disabled={action.id == "cancel" ? posting : (posting || pristine)} {...action} onClick={(e: any) => {
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
