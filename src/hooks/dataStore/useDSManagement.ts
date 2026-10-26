import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useDataEngine } from "@dhis2/app-runtime";
import { SchoolCalendarData } from "dhis2-semis-components";
import useShowAlerts from "../commons/useShowAlert";
import { useDataStore } from "../appwarapper/useDataStore";
import i18n from "@dhis2/d2-i18n";

const DATASTOREQUERY: any = {
    resource: "dataStore/semis/schoolCalendar",
    data: ({ data }: any) => data,
    type: 'update'
}

const CURRENT_DATASTORE_QUERY: any = {
    config: {
        resource: "dataStore/semis/schoolCalendar",
        params: {
            fields: "*"
        }
    }
}

// compares two versions of the document whatever the order of their keys
const stableStringify = (value: any): string => {
    if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`
    if (value && typeof value === "object") {
        return `{${Object.keys(value).filter((key) => value[key] !== undefined).sort()
            .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`
    }
    return JSON.stringify(value) ?? "null"
}

export const dataStoreManagement = () => {
    const engine = useDataEngine()
    const { refetch } = useDataStore()
    const { hide, show } = useShowAlerts()
    const [loading, setloading] = useState(false)
    // version of the document this page loaded or last saved
    const [baseData, setBaseData] = useRecoilState(SchoolCalendarData)

    async function postData(data: any, msg: string | null): Promise<void> {
        setloading(true)

        // do not overwrite changes that someone else saved after this page loaded the calendar
        let current: any
        try {
            current = await engine.query(CURRENT_DATASTORE_QUERY)
        } catch (error: any) {
            setloading(false)
            show({
                message: `${i18n.t("Could not update data")}: ${error?.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            throw error
        }
        if (stableStringify(current?.config) !== stableStringify(baseData)) {
            setloading(false)
            show({
                message: i18n.t("The school calendar was changed by someone else. Reload the page to see the latest version."),
                type: { critical: true }
            });
            setTimeout(hide, 5000);
            throw new Error("The school calendar was changed by someone else")
        }

        await engine.mutate(DATASTOREQUERY, {
            variables: { data: data },
            onComplete() {
                // the saved version is the new base
                setBaseData(data)
                void refetch().then(() => {
                    if (msg !== null) {
                        show({
                            message: msg,
                            type: { success: true }
                        });
                        setTimeout(hide, 5000);
                    }
                }).then(() => {
                    setloading(false)
                })
            },
            onError(error) {
                setloading(false)
                show({
                    message: `${i18n.t("Could not update data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }
        });
    }

    return { posting: loading, postData }
}