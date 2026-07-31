import React from 'react'
import { Edit, Star, StarBorder, Visibility } from '@mui/icons-material'
import { IconButton, Button, Card, CardContent, Typography, Divider } from '@mui/material'
import { CircularLoader } from "@dhis2/ui"
import { useNavigate } from 'react-router-dom'
import { schoolCalendar } from '../../types/dataStore/DataStoreConfig'
import styles from "./mainCard.module.css"
import classNames from 'classnames'
import { D2I18n } from 'dhis2-semis-types'


interface MainCardInterface {
    i18next: D2I18n
    isDefault: any
    loading: boolean
    isConfigured: any
    configuredItem: any
    onViewDetails: (args: { code: string }) => void
    yearOption: { label: string, value: string }
    onSetAsDefault: (args: { code: string }) => void
    onClickEdit: (args: { code: string, values: schoolCalendar['academicYear'] }) => void
}

function MainCard(props: MainCardInterface) {
    const { i18next, onViewDetails, onSetAsDefault, configuredItem, isConfigured, isDefault, yearOption, onClickEdit, loading } = props
    const i18nLocal = i18next
    const navigate = useNavigate()

    const handleNavigate = (code: string) => {
        navigate(`main/${code}`)
    }


    return (
        <Card
            key={yearOption.value}
            elevation={(isDefault && !loading) ? 4 : 1}
            className={classNames(styles.card, (isDefault && !loading) && styles.dafaultCard)}
        >
            <CardContent className={styles.cardContent}>
                <div className={styles.cardHead}>
                    <Typography
                        variant="h6"
                        onClick={() => isConfigured && handleNavigate(configuredItem.code)}
                        style={{
                            fontWeight: 700,
                            color: isConfigured ? '#1e6194' : '#9ca3af',
                            cursor: isConfigured ? 'pointer' : 'default'
                        }}
                    >
                        {yearOption.label}
                    </Typography>

                    <IconButton
                        onClick={() => onClickEdit({ code: configuredItem.code, values: { ...configuredItem.academicYear, code: yearOption.value } })}
                    >
                        <Edit fontSize="small" style={{ color: '#4b5563' }} />
                    </IconButton>
                </div>

                <>
                    <Typography variant="subtitle1" style={{ color: '#334155', fontSize: 13 }}>
                        {configuredItem.academicYear?.description || <em style={{ fontSize: 12 }}>{i18nLocal.t("Not configured")}</em>}
                    </Typography>

                    <Divider style={{ margin: '5px 0', borderColor: "#00000099" }} />

                    <div style={{ flexGrow: 1 }}>
                        <Typography variant="body2" style={{ marginBottom: '0.25rem' }}>
                            <strong>{i18nLocal.t("Label")}:</strong> {configuredItem.academicYear?.label || <em style={{ fontSize: 12 }}>{i18nLocal.t("Not configured")}</em>}
                        </Typography>
                        <div className='d-flex justify-content-between'>
                            <Typography variant="body2" style={{ marginBottom: '0.25rem' }}>
                                <strong>{i18nLocal.t("Start Date")}:</strong> {configuredItem.academicYear?.startDate || <em style={{ fontSize: 12 }}>{i18nLocal.t("Not configured")}</em>}
                            </Typography>
                            <Typography variant="body2">
                                <strong>{i18nLocal.t("End Date")}:</strong> {configuredItem.academicYear?.endDate || <em style={{ fontSize: 12 }}>{i18nLocal.t("Not configured")}</em>}
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.cardActions}>
                        <Button
                            size="small"
                            onClick={() => onSetAsDefault({ code: configuredItem?.academicYear?.code })}
                            disabled={!isConfigured || (loading) || isDefault}
                            endIcon={(loading && isDefault) && <CircularLoader small />}
                            startIcon={
                                (isDefault && !loading)
                                    ? <Star fontSize="small" style={{ color: '#f59e0b' }} />
                                    : <StarBorder fontSize="small" style={{ color: '#9ca3af' }} />
                            }
                            style={{
                                color: (isDefault && !loading) ? '#fff' : '#4b5563',
                                background: (isDefault && !loading) ? '#1e6194' : 'transparent',
                                fontWeight: 500,
                                textTransform: 'none',
                                opacity: !isConfigured ? 0.5 : 1,
                                cursor: !isConfigured ? 'not-allowed' : 'pointer',
                                border: (isDefault && !loading) ? '1px solid #bfdbfe' : '1px solid #d1d5db',
                                borderRadius: '6px'
                            }}
                            fullWidth
                        >
                            {(isDefault && !loading) ? i18nLocal.t('Default') : i18nLocal.t('Set as Default')}
                        </Button>

                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Visibility fontSize="small" />}
                            onClick={() => handleNavigate(configuredItem.code)}
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
                            {i18nLocal.t("Details")}
                        </Button>
                    </div>
                </>
            </CardContent>
        </Card >
    )
}

export default MainCard