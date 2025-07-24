import React, { useEffect, useState } from 'react'
import { AddCircleOutline, Edit, Star, StarBorder, Visibility } from '@mui/icons-material'
import { IconButton, Button, Card, CardContent, Typography, Divider } from '@mui/material'
import { CenteredContent, CircularLoader } from "@dhis2/ui"
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { DataStoreState } from '../../schema/dataStoreSchema'
import { useDataStore } from '../../hooks/appwarapper/useDataStore'
import AddNewSchoolCalendar from '../../components/modal/newSchoolCalendar/AddNewSchoolCalendar'
import ModalComponent from '../../components/modal/Modal'
import { useGetAcademicYears } from '../../hooks/dataElements/useGetAcademicYears'
import { schoolCalendar } from '../../types/dataStore/DataStoreConfig'
import AddNewOption from '../../components/modal/newOption/AddNewOption'
import { dataStoreManagement } from '../../hooks/dataStore/useDSManagement'

function HomePage() {
    const navigate = useNavigate()
    const data = useRecoilValue(DataStoreState)
    const { postData, loading: loadingStore } = dataStoreManagement()
    const { data: academicYears, loading: loadingAcademicYear, getAcademicYear } = useGetAcademicYears()
    const [open, setOpen] = useState(false)
    const [openDialogOption, setOpenDialogOption] = useState(false)
    const [openSaveOption, setOpenSaveOption] = useState(false)
    const [selected, setSelected] = useState("")
    const [values, setValues] = useState<schoolCalendar['academicYear']>({})
    const [defaultYear, setDefaultYear] = useState(() => {
        return data?.defaults?.academicYear || ""
    })

    useEffect(() => {
        getAcademicYear()
    }, [])

    const { loading } = useDataStore()

    if (loading || loadingAcademicYear) {
        return (
            <CenteredContent className="p-4">
                <CircularLoader />
            </CenteredContent>
        )
    }

    const handleSetDefault = (id: string) => {
        setDefaultYear(id)
        //store the default year in the data store
        const updatedData = {
            ...data,
            defaults: {
                ...data.defaults,
                academicYear: id
            }
        };
        postData(updatedData, "Default academic year updated successfully");
        setOpenSaveOption(true);
    }

    const handleEdit = (id: string, values: schoolCalendar['academicYear']) => {
        setSelected(id)
        setValues(values)
        setOpen(true)
    }

    const handleNavigate = (id: string) => {
        navigate(`/main/${id}`)
    }

    const configuredYearsMap = new Map(
        data?.schoolCalendar?.map((item) => [item.academicYear.code, item])
    )

    return (
        <div className="container mt-3">
            <ModalComponent
                onClose={setOpen}
                open={open}
                title="Add new school calendar"
                children={
                    <AddNewSchoolCalendar
                        selected={selected}
                        setOpen={setOpen}
                        academicYearValues={values}
                    />
                }
            />

            <ModalComponent
                onClose={setOpenDialogOption}
                open={openDialogOption}
                title="Add new option"
                children={
                    <AddNewOption
                        selected={selected}
                        setOpen={setOpenDialogOption}
                    />
                }
            />

            <div className="mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: '#1e293b' }}>School Calendar</h4>

                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                        setSelected("")
                        setOpenDialogOption(true)
                    }}
                    style={{
                        borderColor: '#1e40af',
                        color: '#1e40af',
                        fontWeight: 500,
                        textTransform: 'none'
                    }}
                >
                    New School Calendar
                </Button>
            </div>

            <div style={{
                display: 'flex',
                gap: '.5rem',
                flexWrap: 'wrap'
            }}>
                {academicYears.length > 0 && academicYears?.map((yearOption) => {
                    const configuredItem = configuredYearsMap.get(yearOption.value) || {} as schoolCalendar
                    const isConfigured = !!configuredItem.id
                    const isDefault = configuredItem?.id === defaultYear

                    return (
                        <Card
                            key={yearOption.value}
                            elevation={(isDefault && !loadingStore) ? 4 : 1}
                            style={{
                                border: (isDefault && !loadingStore) ? '1.5px solid #1e6194' : '1px solid #e5e7eb',
                                borderRadius: '5px',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-between',
                                width: "350px"
                            }}
                        >
                            <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography
                                        variant="h5"
                                        onClick={() => isConfigured && handleNavigate(configuredItem.id)}
                                        style={{
                                            fontWeight: 700,
                                            color: isConfigured ? '#1e6194' : '#9ca3af',
                                            cursor: isConfigured ? 'pointer' : 'default'
                                        }}
                                    >
                                        {yearOption.label}
                                    </Typography>

                                    <IconButton onClick={() => handleEdit(configuredItem.id, { ...configuredItem.academicYear, code: yearOption.value })}>
                                        <Edit fontSize="small" style={{ color: '#4b5563' }} />
                                    </IconButton>
                                </div>

                                <>
                                    <Typography variant="subtitle1" style={{ color: '#334155', marginTop: '0.25rem' }}>
                                        {configuredItem.academicYear?.description || <em style={{ fontSize: 12 }}>Not configured</em>}
                                    </Typography>

                                    <Divider style={{ margin: '5px 0' }} />

                                    <div style={{ flexGrow: 1 }}>
                                        <Typography variant="body2" style={{ marginBottom: '0.25rem' }}>
                                            <strong>Label:</strong> {configuredItem.academicYear?.label || <em style={{ fontSize: 12 }}>Not configured</em>}
                                        </Typography>
                                        <div className='d-flex justify-content-between'>
                                            <Typography variant="body2" style={{ marginBottom: '0.25rem' }}>
                                                <strong>Start Date:</strong> {configuredItem.academicYear?.startDate || <em style={{ fontSize: 12 }}>Not configured</em>}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>End Date:</strong> {configuredItem.academicYear?.endDate || <em style={{ fontSize: 12 }}>Not configured</em>}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <Button
                                            size="small"
                                            onClick={() => handleSetDefault(configuredItem.id)}
                                            disabled={!isConfigured || (loadingStore)}
                                            endIcon={(loadingStore && isDefault) && <CircularLoader small />}
                                            startIcon={
                                                (isDefault && !loadingStore)
                                                    ? <Star fontSize="small" style={{ color: '#f59e0b' }} />
                                                    : <StarBorder fontSize="small" style={{ color: '#9ca3af' }} />
                                            }
                                            style={{
                                                color: (isDefault && !loadingStore) ? '#1e6194' : '#4b5563',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                opacity: !isConfigured ? 0.5 : 1,
                                                cursor: !isConfigured ? 'not-allowed' : 'pointer',
                                                border: (isDefault && !loadingStore) ? '1px solid #bfdbfe' : '1px solid #d1d5db',
                                                borderRadius: '6px'
                                            }}
                                            fullWidth
                                        >
                                            {(isDefault && !loadingStore) ? 'Default Academic Year' : 'Set as Default'}
                                        </Button>

                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<Visibility fontSize="small" />}
                                            onClick={() => handleNavigate(configuredItem.id)}
                                            disabled={!isConfigured}
                                            style={{
                                                textTransform: 'none',
                                                color: '#1e6194',
                                                borderColor: '#1e6194',
                                                fontWeight: 500,
                                                opacity: !isConfigured ? 0.5 : 1,
                                                cursor: !isConfigured ? 'not-allowed' : 'pointer'
                                            }}
                                            fullWidth
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage