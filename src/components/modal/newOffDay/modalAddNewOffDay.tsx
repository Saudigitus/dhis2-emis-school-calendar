import React from "react";
import {ModalActions, Button, ButtonStrip, CircularLoader} from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import {Form} from "react-final-form";
import GroupForm from "../../form/GroupForm";
import fields from "../../../utils/constants/fields.json";
import i18n from "../../../locales";
import {dataStoreManagement} from "../../../hooks/dataStore/useDSManagement";
import {useRecoilValue} from "recoil";
import {DataStoreState} from "../../../schema/dataStoreSchema";

interface ContentProps {
    setOpen: (value: boolean) => void
}

export default function NewOdffDay({setOpen}: ContentProps): React.ReactElement {
    const {
        postData,
        loading
    } = dataStoreManagement()
    const dataStoreData = useRecoilValue(DataStoreState)

    const modalActions = [
        {
            id: "cancel",
            type: "Cancel",
            label: i18n.t("Cancel"),
            white: true,
            disabled: loading
        },
        {
            id: "save",
            type: "button",
            label: i18n.t("Save"),
            primary: true,
            disabled: loading,
            icon: loading && <CircularLoader small/>
        }
    ];

    function actions(action: string, values: any) {
        switch (action) {
            case "cancel":
                setOpen(false)
                break
            case "save":
                void postData({
                    ...dataStoreData,
                    holidays: [...dataStoreData.holidays, values]
                }).then(() => { setOpen(false); })
                break
        }
    }

    return (
        <WithPadding padding="0px">
      <span>
        {i18n.t("To register new off day, please fill out the form")}
      </span>
            <Form initialValues={{}} onSubmit={() => {
            }}
            >
                {({values}) => {
                    return (
                        <form>
                            <br/>
                            <GroupForm
                                name={i18n.t("Off Day Details")}
                                description={""}
                                disabled={false}
                                fields={fields}
                            />
                            <br/>
                            <ModalActions>
                                <ButtonStrip end>
                                    {modalActions.map((action, i) => (
                                        <Button key={i} {...action} onClick={(e: any) => {
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
