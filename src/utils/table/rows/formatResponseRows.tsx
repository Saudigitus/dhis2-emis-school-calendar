import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React from "react";

interface attributesProps {
    attribute: string
    value: string
}

interface formatResponseRowsProps {
    teiInstances: [{
        orgUnit?: string
        trackedEntity: string
        attributes: attributesProps[]
        enrollments: [{
            enrollment: string
            orgUnit: string
            program: string
            orgUnitName: string
        }]
        event?: string
        active?: string
        orgUnitName?: string
        dataValues?: [{
            createdAt: string
            dataElement: string
            providedElsewhere?: boolean
            updatedAt: string
            value: string
        }]
    }],
    type: string | undefined
}

type RowsProps = Record<string, string | number | boolean | any>;

export function formatResponseRows({ teiInstances, type }: formatResponseRowsProps): RowsProps[] {
    const allRows: RowsProps[] = []

    if (!type || type === 'WITH_REGISTRATION') {
        for (const tei of teiInstances || []) {
            allRows.push({
                ...(attributes((tei?.attributes) ?? [])),
                trackedEntity: tei.trackedEntity,
                enrollmentId: tei?.enrollments?.[0]?.enrollment,
                orgUnitId: tei?.enrollments?.[0]?.orgUnit,
                orgUnitName: tei?.enrollments?.[0]?.orgUnitName,
                programId: tei?.enrollments?.[0]?.program,
                Assessments: <CircularLoader small />
            })
        }
    } else {
        for (const dataValues of teiInstances || []) {
            const columnObj: any = {}
            columnObj["id"] = dataValues.event
            columnObj["active"] = dataValues.active
            columnObj["orgUnitName"] = dataValues.orgUnitName
            for (const dataElement of dataValues.dataValues || []) {
                columnObj[dataElement?.dataElement] = dataElement?.value
            }
            allRows.push(columnObj)
        }
    }

    return allRows;
}

function attributes(data: attributesProps[]): RowsProps {
    const localData: RowsProps = {}
    for (const attribute of data) {
        localData[attribute.attribute] = attribute.value
    }
    return localData
}