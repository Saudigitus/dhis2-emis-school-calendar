import React from "react";
import { Label } from "@dhis2/ui";
import classNames from "classnames";
import styles from "./groupform.module.css";
import { WithPadding, GenericFields, Subtitle } from "../index";
import { type GroupFormProps } from "../../types/form/GroupFormProps";
import { Attribute } from "../../types/generated/models";

function GroupForm(props: GroupFormProps) {
    const { name, fields, description } = props

    console.log(fields,"fields")

    return (
        <WithPadding padding={"16px 5px 0px 5px"}>
            <Subtitle label={name ?? ""} />
            <Label>{description}</Label>
            <WithPadding padding="5px">
                {fields?.filter(x => x.visible)?.map((x, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                classNames("mb-3",
                                    x.error ? styles.errorFormField : styles.notErrorFormField,
                                    i % 2 === 0 ? styles.evenFormField : styles.oddFormField)}
                        >
                            <div className={
                                classNames(
                                    'd-flex',
                                    String(x.valueType) !== "BOOLEAN" && 'flex-column'
                                )
                            }>
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
                })}
            </WithPadding>
        </WithPadding>
    )
}

export default GroupForm;
