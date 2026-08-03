import React from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import { Form } from "react-final-form";
import GroupForm from "../../form/GroupForm";
import { nonSchooldayFields } from "../../../utils/constants/fields";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useRecoilState, useRecoilValue } from "recoil";
import { editState } from "../../../schema/editDataSchema";
import { useParams } from "react-router-dom";
import { mergeHoliday } from "../../../utils/common/mergeHoliday";
import { SchoolCalendarData } from "dhis2-semis-components";
import { D2I18n } from "dhis2-semis-types";

interface ContentProps {
    setOpen: (value: string) => void
    refetch?: () => void
    i18next: D2I18n
}

export default function NewOdffDay({ setOpen, i18next }: ContentProps): React.ReactElement {
    const i18nLocal = i18next
    const { postData, posting } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData)
    const [selectedCard, setSelectedCard] = useRecoilState(editState)
    const { id } = useParams();

    const modalActions = [
        {
            id: "cancel",
            type: "Cancel",
            label: i18nLocal.t("Cancel"),
            white: true,

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
                setOpen('');
                break
            case "save":
                const localData = dataStoreData?.schoolCalendar?.find((x: any) => x.id === id) as unknown as SchoolConfig;

                postData({
                    ...dataStoreData,
                    schoolCalendar: [{ ...mergeHoliday(localData, values) }, ...dataStoreData?.schoolCalendar.filter((x: any) => {
                        if (x.id !== id) {
                            return x;
                        }
                    })]

                }, i18nLocal.t("Off day registered successfully")).then(() => {
                    setOpen('');
                    if (selectedCard.edit) setSelectedCard({ edit: false, data: Object() })
                })

                break
        }
    }

    return (
        <div  >
            <Form initialValues={selectedCard.edit ? { date: selectedCard.data.date, type: selectedCard.data.type, event: selectedCard.data.title } : {}} onSubmit={() => {
            }}
            >
                {({ values, pristine }) => {
                    return (
                        <form>
                            <br />
                            <GroupForm
                                padding="0"
                                name={i18nLocal.t("Off Day Details")}
                                description={""}
                                disabled={false}
                                fields={nonSchooldayFields(i18nLocal).map((field: any) => ({
                                    ...field,
                                    valueType: field.valueType || "TEXT",
                                }))}
                                flex={false}
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
        </div>
    );
}
