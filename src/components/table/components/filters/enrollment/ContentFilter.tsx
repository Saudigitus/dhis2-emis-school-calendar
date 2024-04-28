import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { type CustomAttributeProps } from '../../../../../types/table/AttributeColumns';
import SelectButton from "../selectButton/SelectButton";
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { TableFilterState } from '../../../../../schema/filterSchema';
import i18n from '../../../../../locales';

interface ContentFilterProps {
    headers: CustomAttributeProps[]
}

type FiltersValuesProps = Record<string, any | { endDate: string } | { startDate: string }>;

function ContentFilter(props: ContentFilterProps) {
    const { headers = [] } = props;
    const [filtersValues, setfiltersValues] = useState<FiltersValuesProps>({})
    const [localFilters, setlocalFilters] = useState<CustomAttributeProps[]>([])
    const [fieldsFilled, setfieldsFilled] = useState<FiltersValuesProps>({})
    const [resetValues, setresetValues] = useState("")
    const [filter, setFilter] = useRecoilState(TableFilterState);

    useEffect(() => {
        const copyHeader = [...headers]
        setlocalFilters(copyHeader.slice(0, 4))
    }, [headers])

    const onChangeFilters = (value: any, key: string, type: string, pos: string) => {
        let cloneHeader: any = { ...filtersValues, ...filter }

        if (type === 'DATE') {
            let date = cloneHeader[key] ?? {}
            verifyIsFilled(value)
                ? date = { ...date, [pos]: format(value, "yyyy-MM-dd") }
                : delete date[pos]
            cloneHeader[key] = date
        } else {
            if (verifyIsFilled(value)) {
                cloneHeader[key] = value
            } else {
                const { [key]: _, ...withoutKey } = cloneHeader
                cloneHeader = withoutKey
            }
        }
        setfieldsFilled({ ...cloneHeader })
        setFilter({ ...cloneHeader });
        setfiltersValues({ ...cloneHeader });
    }

    function verifyIsFilled(value: any) {
        if (value === '' || value?.length === 0) {
            return false
        }
        if (value != null) {
            return true
        }
        return false
    }

    const onResetFilters = (id: string) => {
        const copyHeader = { ...filtersValues }
        delete copyHeader[id];

        setfiltersValues(copyHeader)
        setfieldsFilled(copyHeader)
        setFilter(copyHeader)
    }

    useEffect(() => {
        if (resetValues?.length > 0) {
            setresetValues("")
        }
    }, [resetValues])

    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
            {
                localFilters.map((colums, index) => (
                    <SelectButton key={index}
                        tooltipContent=''
                        title={colums.displayName}
                        value={filtersValues[colums.id]}
                        colum={colums}
                        onChange={onChangeFilters}
                        disabledReset={
                            typeof filtersValues[colums.id] === "object"
                                ? filtersValues[colums.id]?.startDate !== undefined && filtersValues[colums.id]?.endDate === undefined
                                : filtersValues[colums.id] === undefined
                        }
                        disabled={
                            typeof filtersValues[colums.id] === "object"
                                ? fieldsFilled[colums.id]?.startDate === filtersValues[colums.id]?.startDate &&
                                fieldsFilled[colums.id]?.endDate === filtersValues[colums.id]?.endDate

                                : fieldsFilled[colums.id] === filtersValues[colums.id]
                        }
                        filled={(Boolean(fieldsFilled[colums.id])) && fieldsFilled[colums.id]}
                        onResetFilters={onResetFilters}
                    />
                ))
            }
            <div style={{ marginTop: 0 }}>
                <Button style={{
                    color: "rgb(33, 41, 52)",
                    fontSize: 14,
                    textTransform: "none",
                    fontWeight: 400
                }}
                    onClick={() => {
                        setfiltersValues({})
                        setfieldsFilled({})
                        setFilter({})
                    }}
                    variant='outlined'
                >
                    {i18n.t("Reset Filter")}
                </Button>
            </div>

        </div>
    )
}

export default ContentFilter
