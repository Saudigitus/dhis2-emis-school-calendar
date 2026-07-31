import styles from "./Home.module.css"
import { useRecoilValue } from 'recoil'
import { D2I18n } from 'dhis2-semis-types'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useUrlParams } from "dhis2-semis-functions"
import { LinearProgress, Paper } from '@mui/material'
import MainCard from '../../components/mainCard/mainCard'
import { schoolCalendar } from '../../types/dataStore/DataStoreConfig'
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement'
import { useGetAcademicYears } from '../../hooks/dataElements/useGetAcademicYears'
import RightActionsButtons from '../../components/rightActionsButtons/RightActionsButtons'
import AddNewSchoolCalendar from "../../components/modal/newSchoolCalendar/AddNewSchoolCalendar"
import { ModalComponent, SchoolCalendarData, WithBorder, WithPadding } from 'dhis2-semis-components'


function SchoolCalendarHomePage({ i18next }: { i18next: D2I18n }) {
    const i18nLocal = i18next
    const navigate = useNavigate()
    const { useQuery } = useUrlParams()
    const dataFilter = useQuery.get("filter")
    const data = useRecoilValue(SchoolCalendarData)
    const { postData, posting: loadingStore } = dataStoreManagement()
    const [open, setOpen] = useState(false)
    const [openSaveOption, setOpenSaveOption] = useState(false)
    const [selected, setSelected] = useState("")
    const [values, setValues] = useState<schoolCalendar['academicYear']>()
    const [defaultYear, setDefaultYear] = useState(() => { return data?.defaults?.academicYear || "" })
    const { data: academicYears, loading: loadingAcademicYear, getAcademicYear, error } = useGetAcademicYears()

    useEffect(() => {
        if (data) getAcademicYear()
    }, [data])

    const handleSetDefault = ({ code }: { code: string }) => {
        setDefaultYear(code)
        const updatedData = {
            ...data,
            defaults: {
                ...data.defaults,
                academicYear: code
            }
        };

        postData(updatedData, i18nLocal.t("Default academic year updated successfully"));
        setOpenSaveOption(true);
    }

    const handleEdit = ({ code, values }: { code: string, values: schoolCalendar['academicYear'] }) => {
        setSelected(code)
        setValues(values)
        setOpen(true)
    }


    const handleNavigate = ({ code }: { code: string }) => {
        navigate(`main/${code}`)
    }

    const configuredYearsMap = new Map(
        data?.schoolCalendar?.map((item) => [item?.academicYear?.code, item])
    )

    return (
        <div className="mt-3">
            <WithPadding p="0px 30px">
                <Paper>
                    <WithBorder type="bottom">
                        <div className={styles.header}>
                            <h4 className={styles.title}>{"School Calendar"}</h4>
                            <div className={styles.rightElements}>
                                <RightActionsButtons i18n={i18next} />
                            </div>
                        </div>
                    </WithBorder>

                    <div className={styles.mainContent}>
                        <div className="my-2">
                            {(loadingStore || (loadingAcademicYear && !open)) && <LinearProgress />}
                            {/* {(loadingStore || (loadingAcademicYear && !open && !openDialogOption)) && <LinearProgress />} */}
                        </div>

                        {error?.error && !(loadingStore || (loadingAcademicYear && !open)) ?
                            // {error?.error && !(loadingStore || (loadingAcademicYear && !open && !openDialogOption)) ?
                            <div style={{ fontSize: 13.5 }} className={`my-4 alert ${error?.type == "config" ? "alert-danger" : "alert-warning"}`} role="alert">
                                {error.type === "config"
                                    ? i18nLocal.t("No academic year configuration found. Please, ensure the data element is configured correctly.")
                                    : i18nLocal.t("Error fetching academic years. Please, make sure the configured academic year exists.")}
                            </div> :

                            <div className={styles.containerCards}>
                                {academicYears?.options
                                    ?.filter((opt) =>
                                        dataFilter ? (dataFilter === "inactive"
                                            ? !configuredYearsMap.get(opt.value)?.academicYear
                                            : configuredYearsMap.get(opt.value)?.academicYear)
                                            : true
                                    )
                                    ?.map((yearOption) => {
                                        const configuredItem: any = configuredYearsMap.get(yearOption.value) || {} as schoolCalendar
                                        const isConfigured = !!configuredItem.id
                                        const isDefault = configuredItem?.academicYear?.code == defaultYear

                                        return (
                                            <MainCard
                                                key={"main-card"}
                                                yearOption={yearOption}
                                                onViewDetails={(args) => handleNavigate(args)}
                                                onSetAsDefault={(args) => { handleSetDefault(args) }}
                                                configuredItem={configuredItem}
                                                onClickEdit={(args) => handleEdit(args)}
                                                loading={loadingStore}
                                                isDefault={isDefault}
                                                isConfigured={isConfigured}
                                                i18next={i18next}

                                            />
                                        )
                                    })}
                            </div>
                        }
                    </div>
                </Paper>
            </WithPadding>

            <ModalComponent
                open={open}
                handleClose={() => setOpen(false)}
                title={i18nLocal.t("Add new school calendar")}
                children={
                    <AddNewSchoolCalendar
                        i18next={i18next}
                        setOpen={setOpen}
                        selected={selected}
                        academicYearValues={values}
                    />
                }
            />
        </div >
    )
}

export default SchoolCalendarHomePage