import React, {useState} from "react";
import {ModalActions, Button, ButtonStrip} from "@dhis2/ui";
import WithPadding from "../../template/WithPadding";
import {Form} from "react-final-form";
import GroupForm from "../../form/GroupForm";
import fields from "../../../utils/constants/fields.json";
import i18n from "../../../locales";

interface ContentProps {
    setOpen: (value: boolean) => void
}

export default function NewOdffDay({setOpen}: ContentProps): React.ReactElement {

    const modalActions = [
        {
            id: "cancel",
            type: "Cancel",
            label: i18n.t("Cancel"),
            white: true
        },
        {
            id: "saveandcontinue",
            type: "button",
            label: i18n.t("Save"),
            primary: true
        }
    ];

    return (
        <WithPadding padding="0px">
      <span>
        {i18n.t("To register new off day, please fill out the form")}
      </span>
            <Form initialValues={{}}
                  onSubmit={(e) => {
                  }
                      // navigate(`/new-template?program=${e.program}&templateName=${e.name}`)
                  }
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
                                            console.log(e)
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
