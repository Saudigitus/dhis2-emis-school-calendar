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

interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    refetch?: () => void,
}

export default function AddNewOption({ setOpen, selected, refetch }: ContentProps) {
    const { postData, loading } = dataStoreManagement()
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
                setOpen(false)
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
