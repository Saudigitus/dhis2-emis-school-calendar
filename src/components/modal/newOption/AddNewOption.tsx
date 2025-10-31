import React, { useEffect } from "react";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import GroupForm from "../../form/GroupForm";
import { fieldsOptions } from "../../../utils/constants/fieldsOptions";
import i18n from "../../../locales";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";
import { usePostOption } from "../../../hooks/option/usePostOption";
import useShowAlerts from "../../../hooks/commons/useShowAlert";
import { LinearProgress } from "@mui/material";
import { D2I18n } from "dhis2-semis-types";

interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    refetch?: () => void,
    i18next: D2I18n
}

export default function AddNewOption({ setOpen, selected, i18next }: ContentProps) {
    const i18nLocal = i18n ?? i18next
    const { show, hide } = useShowAlerts()
    const { postOption, loading: posting } = usePostOption()
    const { loading: loading, data, getAcademicYear, refetch } = useGetAcademicYears()

    useEffect(() => {
        getAcademicYear()
    }, [])

    const modalActions = [
        {
            id: "cancel",
            type: "button",
            label: i18nLocal.t("Cancel"),
            white: true
        },
        {
            id: "save",
            type: "button",
            label: i18nLocal.t("Save"),
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
                if (data?.options?.some((opt) => opt.value === values?.code || opt?.label === values?.name)) {
                    show({
                        message: `${("Could not get data")}: typed code or name already exist.`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 1000);
                }
                else {
                    refetch()
                    getAcademicYear()
                    postOption({
                        ...values,
                        optionSet: { id: data?.id }
                    },
                        i18nLocal.t("Option saved successfully."))
                        .then(() => {
                            refetch()
                            setOpen(false)
                        })
                }
                break
        }
    }

    return (
        <WithPadding padding="0px">
            <span>
                {i18nLocal.t("To register new option, please fill out the form")}
            </span>

            <Form onSubmit={() => { }}>
                {({ values, pristine, valid }) => {
                    return (
                        <form>
                            <br />
                            {loading && <LinearProgress />}
                            <GroupForm
                                name={i18nLocal.t("Off Day Details")}
                                description={""}
                                disabled={false}
                                fields={fieldsOptions(i18nLocal).map((field: any) => ({
                                    type: field.type ?? "text",
                                    ...field
                                }))}
                            />
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
