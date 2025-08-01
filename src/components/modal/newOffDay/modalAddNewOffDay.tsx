import React from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import { Form } from "react-final-form";
import GroupForm from "../../form/GroupForm";
import fields from "../../../utils/constants/fields.json";
import i18n from "../../../locales";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useRecoilState, useRecoilValue } from "recoil";
import { editState } from "../../../schema/editDataSchema";
import { useParams } from "react-router-dom";
import { mergeHoliday } from "../../../utils/common/mergeHoliday";
import { SchoolCalendarData } from "dhis2-semis-components";

interface ContentProps {
    setOpen: (value: boolean) => void
    selected?: string
    refetch?: () => void
}

export default function NewOdffDay({ setOpen, selected }: ContentProps): React.ReactElement {
    const { postData, posting } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData)
    const [selectedCard, setSelectedCard] = useRecoilState(editState)
    const { id } = useParams();

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
            icon: posting && <CircularLoader small />
        }
    ];

    function actions(action: string, values: any) {
        switch (action) {
            case "cancel":
                setOpen(false)
                break
            case "save":
                const localData = dataStoreData.schoolCalendar?.find((x) => x.id === id) as unknown as SchoolConfig;

                mergeHoliday(localData, values)

                // postData({
                //     ...dataStoreData,
                //     schoolCalendar: [{ ...mergeHoliday(localData, values) }, ...dataStoreData.schoolCalendar.filter((x) => {
                //         if (x.id !== id) {
                //             return x;
                //         }
                //     })]

                // }, i18n.t("Off day registered successfully")).then(() => {
                //     setOpen(false);
                //     if (selectedCard.edit) setSelectedCard({ edit: false, data: Object() })
                // })

                break
        }
    }

    return (
        <WithPadding padding="0px">
            <span>
                {i18n.t("To register new off day, please fill out the form")}
            </span>
            <Form initialValues={selectedCard.edit ? { date: selectedCard.data.date, type: selectedCard.data.type, event: selectedCard.data.title } : {}} onSubmit={() => {
            }}
            >
                {({ values, pristine }) => {
                    return (
                        <form>
                            <br />
                            <GroupForm
                                name={i18n.t("Off Day Details")}
                                description={""}
                                disabled={false}
                                fields={fields.map((field: any) => ({
                                    ...field,
                                    valueType: field.valueType || "TEXT",
                                }))}
                            />
                            <br />
                            <ModalActions>
                                <ButtonStrip end>
                                    {modalActions.map((action, i) => (
                                        <Button key={i} disabled={action.id === "cancel" ? posting : posting || pristine} {...action} onClick={(e: any) => {
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
