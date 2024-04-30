import React from "react";
import {ModalActions, Button, ButtonStrip, CircularLoader} from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import {Form} from "react-final-form";
import GroupForm from "../../form/GroupForm";
import fields from "../../../utils/constants/fields.json";
import i18n from "../../../locales";
import {dataStoreManagement} from "../../../hooks/dataStore/useDSManagement";
import {useRecoilState, useRecoilValue} from "recoil";
import {DataStoreState} from "../../../schema/dataStoreSchema";
import {editState} from "../../../schema/editDataSchema";

interface ContentProps {
    setOpen: (value: boolean) => void
}

export default function NewOdffDay({setOpen}: ContentProps): React.ReactElement {
    const { postData, loading} = dataStoreManagement()
    const dataStoreData = useRecoilValue(DataStoreState)
    const [selectedCard, setSelectedCard] = useRecoilState(editState)

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
            icon: loading && <CircularLoader small/>
        }
    ];

    function actions(action: string, values: any) {
        switch (action) {
            case "cancel":
                setOpen(false)
                break
            case "save":
                let copy = [...dataStoreData.holidays]

                if (selectedCard.edit) {
                    copy[selectedCard?.data?.index] = values
                } else {
                    copy.push(values)
                }

                void postData({
                    ...dataStoreData,
                    holidays: [...copy]
                }, 'Off day registered successfully').then(() => {
                    setOpen(false);
                    if (selectedCard.edit) setSelectedCard({edit: false, data: Object()})
                })

                break
        }
    }

    return (
        <WithPadding padding="0px">
      <span>
        {i18n.t("To register new off day, please fill out the form")}
      </span>
            <Form initialValues={selectedCard.edit ? {date: selectedCard.data.date, type: selectedCard.data.type, event: selectedCard.data.title} : {}} onSubmit={() => {
            }}
            >
                {({values, pristine}) => {
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
