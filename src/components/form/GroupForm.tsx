import { Label } from "@dhis2/ui";
import React from "react";
import GenericFields from "../genericFields/GenericFields";
import { type GroupFormProps } from "../../types/form/GroupFormProps";
import styles from './groupform.module.css'
import { WithPadding } from "dhis2-semis-components";

function GroupForm(props: GroupFormProps) {
    const { fields, description } = props

    return (
            <WithPadding p={"16px 5px 0px 5px"}>
                <Label>{description}</Label>
                <WithPadding p="0.2rem" />
                <WithPadding p={"10px"}>
                    {fields?.filter(x => x.visible)?.map((x, i) => {
                        return (
                            <div className="" key={i}
                                style={{ display: "flex", padding: (x.error ?? false) ? "8px 8px 8px 12px" : "8px 8px 8px 5px", backgroundColor: (x.error === true) ? "#FBEAE5" : "", height: (x.error ?? false) ? 102 : "auto" }}>
                                <div className="col-12 col-md-6 d-flex">
                                    <Label className={styles.label}>
                                        {x.labelName} {(x.required === true) ? " *" : ""}
                                    </Label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <GenericFields
                                        attribute={x}
                                        disabled={x.disabled}
                                        valueType={x.valueType}
                                    />
                                    <span className={styles.content}>
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
