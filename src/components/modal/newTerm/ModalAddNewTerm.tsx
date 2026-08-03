import React from "react";
import { ModalActions, Button, ButtonStrip, CircularLoader } from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import { Form } from "react-final-form";
import GroupForm from "../../form/GroupForm";
import { fieldsTerm } from "../../../utils/constants/fieldsTerm";
import { dataStoreManagement } from "../../../hooks/dataStore/useDSManagement";
import { useRecoilState, useRecoilValue } from "recoil";
import { editState } from "../../../schema/editDataSchema";
import { useParams } from "react-router-dom";
import { SchoolCalendarData } from "dhis2-semis-components";
import { mergeTerm } from "../../../utils/common/mergeTerm";
import { D2I18n } from "dhis2-semis-types";

interface ContentProps {
    setOpen: (value: string) => void
    refetch?: () => void
    i18next: D2I18n
}

export default function NewSchoolTerm({ setOpen, i18next }: ContentProps): React.ReactElement {
    const i18nLocal = i18next
    const { id } = useParams();
    const { postData, posting } = dataStoreManagement()
    const dataStoreData = useRecoilValue(SchoolCalendarData)
    const [selectedCard, setSelectedCard] = useRecoilState(editState)

    console.log(123)
    const modalActions = [
        {
            id: "cancel",
            type: "Cancel",
            label: i18nLocal.t("Cancel"),
            white: true,
            onClick: () => setOpen("")
        },
        {
            id: "save",
            type: "submit",
            label: i18nLocal.t("Save"),
            primary: true,
            icon: posting && <CircularLoader small />,
        }
    ];

    const onFormSubmit = (values: any) => {
        const localData = dataStoreData?.schoolCalendar?.find((x: any) => x.id === id) as unknown as SchoolConfig;
        const updateValues = selectedCard?.edit ? values : { ...values, key: values?.description?.replace(/\s+/g, '')?.toLowerCase() }

        postData({
            ...dataStoreData,
            schoolCalendar: [{ ...mergeTerm(localData, { ...updateValues }) }, ...dataStoreData?.schoolCalendar.filter((x: any) => {
                if (x.id !== id) {
                    return x;
                }
            })]

        }, i18nLocal.t("Data registered successfully")).then(() => {
            setOpen("");
            if (selectedCard.edit) setSelectedCard({ edit: false, data: Object() })
        })
    }

    return (
        <Form
            initialValues={selectedCard.edit ? { key: selectedCard.data.key, startDate: selectedCard.data.startDate, description: selectedCard.data.description, endDate: selectedCard.data.endDate } : {}}
            onSubmit={onFormSubmit}
        >
            {({ pristine, handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} >
                        <br />
                        <GroupForm
                            description={""}
                            flex={false}
                            padding="0"
                            disabled={false}
                            fields={fieldsTerm(i18nLocal).map((field: any) => ({
                                ...field,
                                valueType: field.valueType || "TEXT",
                            }))}
                        />
                        <br />
                        <ModalActions>
                            <ButtonStrip end>
                                {modalActions.map((action, i) => (
                                    <Button key={i} disabled={action.id === "cancel" ? posting : posting || pristine} {...action}>
                                        {action.label}
                                    </Button>
                                ))}
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                );
            }}
        </Form>
    );
}
