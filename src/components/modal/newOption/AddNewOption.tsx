import React, { useEffect } from "react";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import GroupForm from "../../form/GroupForm";
import { fieldsOptions } from "../../../utils/constants/fieldsOptions";
import { useGetAcademicYears } from "../../../hooks/dataElements/useGetAcademicYears";
import { usePostOption } from "../../../hooks/option/usePostOption";
import useShowAlerts from "../../../hooks/commons/useShowAlert";
import { LinearProgress } from "@mui/material";
import { D2I18n } from "dhis2-semis-types";

interface ContentProps {
    setOpen: (value: boolean) => void
    refetch?: () => void,
    i18next: D2I18n
}

export default function AddNewOption({ setOpen, i18next }: ContentProps) {
    const i18nLocal = i18next
    const { show, hide } = useShowAlerts()
    const { postOption, loading: posting } = usePostOption()
    const { loading: loading, data, getAcademicYear, refetch } = useGetAcademicYears()

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
                    refetch(false)
                    getAcademicYear(false)
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


    const validateForm = (values: any, data: any, i18n: any) => {
        const errors: any = {};

        const nameExists = data?.options?.some(
            (opt: any) => opt.label?.toLowerCase() === values.name?.trim().toLowerCase()
        );
        if (nameExists) {
            errors.name = i18n.t("This name already exists");
        }

        const codeExists = data?.options?.some(
            (opt: any) => opt.value?.toLowerCase() === values.code?.trim().toLowerCase()
        );
        if (codeExists) {
            errors.code = i18n.t("This code already exists");
        }

        return errors;
    };

    return (
        <WithPadding padding="0px">
            <span>
                {i18nLocal.t("To register new option, please fill out the form")}
            </span>

            <Form
                onSubmit={() => { }}
                validate={(values) => validateForm(values, data, i18nLocal)}
            >
                {({ values, pristine, valid, errors }) => {
                    return (
                        <form>
                            <br />
                            {loading && <LinearProgress />}
                            <GroupForm
                                name={i18nLocal.t("Off Day Details")}
                                description={""}
                                disabled={false}
                                fields={fieldsOptions({
                                    i18n: i18nLocal,
                                    errors: errors,
                                }).map((field: any) => ({
                                    ...field,
                                    type: field.type ?? "text",
                                    error: values[field?.name]
                                        ? errors[field?.name] : "",
                                }))}
                            />
                            <br />
                            <ModalActions>
                                <ButtonStrip end>
                                    {modalActions.map((action, i) => (
                                        <Button
                                            key={i}
                                            {...action}
                                            disabled={action.id == "cancel" ? posting : (posting || pristine)}
                                            onClick={(e: any) => {
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
