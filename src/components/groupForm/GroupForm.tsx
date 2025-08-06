import React from "react";
import { Label } from "@dhis2/ui";
import classNames from "classnames";
import styles from "./groupform.module.css";
import { GenericFields } from "../index";
import { type GroupFormProps } from "../../types/form/GroupFormProps";
import { Attribute } from "../../types/generated/models";
import { WithPadding } from "dhis2-semis-components";

function GroupForm(props: GroupFormProps) {
    const { name, fields, description } = props

    return (
        <WithPadding p={"16px 5px 0px 5px"}>
            <Label>{description}</Label>
            <WithPadding p="5px">
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
