import { useState } from 'react';
import { useRecoilValue } from 'recoil';
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

const same = (a: any, b: any) => stableStringify(a) === stableStringify(b)
const isObject = (value: any) => value !== null && typeof value === "object" && !Array.isArray(value)
// years are identified by id, terms by key and non-school days by date
const idOf = (item: any) => isObject(item) ? (item.id ?? item.key ?? item.date) : undefined

// puts the changes this page made (base -> mine) on top of the version saved meanwhile (theirs);
// fails only when both changed the same value
function mergeChanges(base: any, mine: any, theirs: any): { ok: boolean, value?: any } {
    if (same(mine, base)) return { ok: true, value: theirs }
    if (same(theirs, base) || same(mine, theirs)) return { ok: true, value: mine }

    const items = [...(Array.isArray(base) ? base : []), ...(Array.isArray(mine) ? mine : []), ...(Array.isArray(theirs) ? theirs : [])]
    if (Array.isArray(mine) && Array.isArray(theirs) && (base === undefined || Array.isArray(base)) && items.every((x) => idOf(x) !== undefined)) {
        const byId = (list: any[] = []) => new Map(list.map((x) => [idOf(x), x]))
        const [b, m, t] = [byId(base), byId(mine), byId(theirs)]
        const merged: any[] = []
        for (const id of new Set([...m.keys(), ...t.keys()])) {
            const result = mergeChanges(b.get(id), m.get(id), t.get(id))
            if (!result.ok) return { ok: false }
            if (result.value !== undefined) merged.push(result.value)
        }
        return { ok: true, value: merged }
    }

    if (isObject(mine) && isObject(theirs) && (base === undefined || isObject(base))) {
        const merged: any = {}
        for (const key of new Set([...Object.keys(mine), ...Object.keys(theirs)])) {
            const result = mergeChanges(base?.[key], mine[key], theirs[key])
            if (!result.ok) return { ok: false }
            if (result.value !== undefined) merged[key] = result.value
        }
        return { ok: true, value: merged }
    }

    return { ok: false }
}

export const dataStoreManagement = () => {
    const engine = useDataEngine()
    const { refetch } = useDataStore()
    const { hide, show } = useShowAlerts()
    const [loading, setloading] = useState(false)
    // version of the document this page loaded or last saved
    const baseData = useRecoilValue(SchoolCalendarData)

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
        const merged = same(current?.config, baseData)
            ? { ok: true, value: data }
            : mergeChanges(baseData, data, current?.config)
        if (merged.ok) {
            data = merged.value
        } else {
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
                // the re-read version is the new base (setting it here too reloads the app's program rules twice)
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