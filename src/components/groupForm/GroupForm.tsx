import React from "react";
import { Label } from "@dhis2/ui";
import classNames from "classnames";
import styles from "./groupform.module.css";
import { WithPadding, GenericFields, Subtitle } from "../index";
import { GroupFormProps } from "../../types/form/GroupFormProps";

function GroupForm(props: GroupFormProps) {
    const { name, fields, description } = props

    return (
        <WithPadding padding={"16px 5px 0px 5px"}>
            <Subtitle label={name} />
            <Label>{description}</Label>
            <WithPadding padding="5px">
                {fields?.filter(x => x.visible)?.map((x, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                classNames("row d-flex align-items-center mb-3",
                                    x.error ? styles.errorFormField : styles.notErrorFormField,
                                    i % 2 === 0 ? styles.evenFormField : styles.oddFormField)}
                        >
                            <div className="col-12 col-md-6 d-flex flex-column">
                                <Label className={styles.label}>
                                    {x.labelName} {x.required ? " *" : ""}
                                </Label>
                                <GenericFields
                                    attribute={x}
                                    disabled={x.disabled}
                                    valueType={x.valueType}
                                />
                                <span className={styles.helpText}>
                                    {x.content}
                                </span>
                            </div>
                        </div>
                    )
                }
                )}
            </WithPadding>
        </WithPadding>
    )
}

export default GroupForm;
