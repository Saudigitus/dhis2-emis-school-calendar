import React, { useState } from 'react'
import classNames from 'classnames'
import { CircularLoader } from "@dhis2/ui"
import styles from "./mainCard.module.css"
import { D2I18n } from 'dhis2-semis-types'
import { getLocale } from '../../utils/common/getLocale'
import { schoolCalendar } from '../../types/dataStore/DataStoreConfig'
import { getYearStatus, toLocalDate } from '../../utils/common/getYearStatus'
import { Add, CalendarToday, DateRange, EventBusy, MoreVert, Star, StarBorder, Visibility } from '@mui/icons-material'
import { Alert, Button, Card, CardContent, Chip, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'
interface MainCardInterface {
    i18next: D2I18n
    isDefault: any
    loading: boolean
    isConfigured: any
    configuredItem: any
    yearOption: { label: string, value: string }
    onViewDetails: (args: { id: string }) => void
    onSetAsDefault: (args: { id: string }) => void
    onClickEdit: (args: { id: string, values: schoolCalendar['academicYear'] }) => void
}

const PRIMARY = '#2E5F8F'
const GREY = 'rgba(0,0,0,0.6)'
const LIGHT_GREY = 'rgba(0,0,0,0.38)'
const BORDER_GREY = '#BDBDBD'
const WEEK_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

// 1 January 2024 was a Monday
const weekDayName = (index: number, locale: string, weekday: 'narrow' | 'long') =>
    new Intl.DateTimeFormat(locale, { weekday }).format(new Date(2024, 0, 1 + index))

const buttonSx = {
    height: 40,
    borderRadius: '6px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    textTransform: 'none',
    color: PRIMARY,
    borderColor: 'rgba(46,95,143,0.5)',
} as const

function MainCard(props: MainCardInterface) {
    const { i18next, onViewDetails, onSetAsDefault, configuredItem, isConfigured, isDefault, yearOption, onClickEdit, loading } = props
    const i18nLocal = i18next
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

    const locale = getLocale(i18nLocal?.language)
    const academicYear = configuredItem?.academicYear
    const showAsDefault = isDefault && !loading
    const year = isConfigured ? getYearStatus(academicYear?.startDate, academicYear?.endDate) : undefined
    const ended = year?.status === 'ended'
    const yearColor = !isConfigured ? LIGHT_GREY : ended ? GREY : PRIMARY

    const startDate = toLocalDate(academicYear?.startDate)
    const endDate = toLocalDate(academicYear?.endDate)
    const formatDate = (date: Date) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date)

    const terms = configuredItem?.classPeriods?.length ?? 0
    const daysOff = configuredItem?.holidays?.length ?? 0
    const weekDays = WEEK_DAYS.map((day, index) => ({
        day,
        isSchoolDay: Boolean(configuredItem?.weekDays?.[day]),
        initial: weekDayName(index, locale, 'narrow'),
        name: weekDayName(index, locale, 'long'),
    }))
    const schoolDays = weekDays.filter((day) => day.isSchoolDay).map((day) => day.name)

    const warning = terms === 0 && schoolDays.length === 0
        ? i18nLocal.t("No terms and no school days yet. Attendance cannot be taken.")
        : terms === 0
            ? i18nLocal.t("No terms yet. Attendance cannot be taken.")
            : schoolDays.length === 0
                ? i18nLocal.t("No school days yet. Attendance cannot be taken.")
                : ""

    const openEdit = () => onClickEdit({ id: configuredItem?.id, values: { ...academicYear, code: yearOption.value } })

    const summaryChipSx = {
        color: ended ? GREY : 'rgba(0,0,0,0.87)',
        borderColor: BORDER_GREY,
        '& .MuiChip-icon': { fontSize: 16, color: ended ? LIGHT_GREY : PRIMARY },
    }

    const statusChip = () => {
        if (!isConfigured) {
            return <Chip size="small" variant="outlined" label={i18nLocal.t("Not configured")} sx={{ color: GREY, borderColor: BORDER_GREY }} />
        }
        switch (year?.status) {
            case 'inProgress':
                return <Chip size="small" variant="outlined" color="success" label={i18nLocal.t("In progress")} />
            case 'upcoming':
                return (
                    <Chip
                        size="small"
                        variant="outlined"
                        sx={{ color: PRIMARY, borderColor: PRIMARY }}
                        label={year.daysToStart === 1 ? i18nLocal.t("Starts in 1 day") : i18nLocal.t("Starts in {{count}} days", { count: year.daysToStart })}
                    />
                )
            case 'ended':
                return <Chip size="small" label={i18nLocal.t("Ended")} />
            default:
                return null
        }
    }

    return (
        <Card
            elevation={0}
            key={yearOption.value}
            className={classNames(styles.card, showAsDefault && styles.defaultCard)}
        >
            <CardContent className={styles.yearContent}>
                <div className={styles.yearHead}>
                    <div className={styles.yearTitle}>
                        <Typography
                            component="h2"
                            onClick={() => isConfigured && onViewDetails({ id: configuredItem?.id })}
                            sx={{
                                m: 0,
                                fontSize: 28,
                                lineHeight: 1,
                                fontWeight: 700,
                                color: yearColor,
                                cursor: isConfigured ? 'pointer' : 'default'
                            }}
                        >
                            {yearOption.label}
                        </Typography>

                        <div className={styles.chipRow}>
                            {showAsDefault &&
                                <Chip
                                    size="small"
                                    icon={<Star />}
                                    label={i18nLocal.t("Default")}
                                    sx={{ bgcolor: PRIMARY, color: '#fff', '& .MuiChip-icon': { fontSize: 16, color: '#F0A030' } }}
                                />
                            }
                            {statusChip()}
                        </div>
                    </div>

                    {isConfigured &&
                        <>
                            <IconButton
                                aria-label={i18nLocal.t("More actions for {{- year}}", { year: yearOption.label })}
                                onClick={(event) => setMenuAnchor(event.currentTarget)}
                                sx={{ color: 'rgba(0,0,0,0.54)' }}
                            >
                                <MoreVert />
                            </IconButton>
                            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                                <MenuItem onClick={() => { setMenuAnchor(null); openEdit() }}>
                                    {i18nLocal.t("Edit details")}
                                </MenuItem>
                            </Menu>
                        </>
                    }
                </div>

                {!isConfigured &&
                    <Typography variant="body2" sx={{ color: GREY }}>
                        {i18nLocal.t("This year has no calendar yet. Set its dates, school days, terms and non-school days to use it in Attendance.")}
                    </Typography>
                }

                {(startDate && endDate) &&
                    <div className={styles.dates}>
                        <div className={styles.dateLine}>
                            <CalendarToday sx={{ fontSize: 18 }} />
                            {i18nLocal.t("{{startDate}} to {{endDate}}", { startDate: formatDate(startDate), endDate: formatDate(endDate) })}
                        </div>
                        {year?.status === 'inProgress' &&
                            <>
                                <LinearProgress
                                    aria-hidden
                                    variant="determinate"
                                    value={year.percentDone}
                                    sx={{ height: 4, bgcolor: '#C0CFDD', '& .MuiLinearProgress-bar': { bgcolor: PRIMARY } }}
                                />
                                <Typography variant="caption" sx={{ color: GREY }}>
                                    {i18nLocal.t("{{percent}}% of the year done", { percent: year.percentDone })}
                                </Typography>
                            </>
                        }
                    </div>
                }

                {isConfigured &&
                    <div className={styles.summary}>
                        <Chip
                            size="small"
                            variant="outlined"
                            icon={<DateRange />}
                            sx={summaryChipSx}
                            label={terms === 1 ? i18nLocal.t("1 term") : i18nLocal.t("{{count}} terms", { count: terms })}
                        />
                        <Chip
                            size="small"
                            variant="outlined"
                            icon={<EventBusy />}
                            sx={summaryChipSx}
                            label={daysOff === 1 ? i18nLocal.t("1 day off") : i18nLocal.t("{{count}} days off", { count: daysOff })}
                        />
                        <span
                            role="img"
                            className={styles.weekDays}
                            aria-label={schoolDays.length
                                ? i18nLocal.t("School days: {{days}}", { days: schoolDays.join(", ") })
                                : i18nLocal.t("No school days")}
                        >
                            {weekDays.map(({ day, initial, isSchoolDay }) => {
                                const schoolDayColor = ended ? LIGHT_GREY : PRIMARY
                                return (
                                    <span
                                        key={day}
                                        aria-hidden
                                        className={styles.weekDay}
                                        style={{
                                            background: isSchoolDay ? schoolDayColor : '#fff',
                                            color: isSchoolDay ? '#fff' : GREY,
                                            borderColor: isSchoolDay ? schoolDayColor : BORDER_GREY,
                                        }}
                                    >
                                        {initial}
                                    </span>
                                )
                            })}
                        </span>
                    </div>
                }

                {(isConfigured && warning) && <Alert severity="warning">{warning}</Alert>}

                <div className={styles.yearActions}>
                    {!isConfigured
                        ? <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={openEdit}
                            sx={{ ...buttonSx, flex: 1, minWidth: 0 }}
                        >
                            {i18nLocal.t("Set up calendar")}
                        </Button>
                        : <>
                            {!showAsDefault &&
                                <Button
                                    variant="outlined"
                                    onClick={() => onSetAsDefault({ id: academicYear?.code })}
                                    disabled={loading}
                                    startIcon={<StarBorder />}
                                    endIcon={(loading && isDefault) && <CircularLoader small />}
                                    sx={{ ...buttonSx, flex: 'none', px: '10px' }}
                                >
                                    {i18nLocal.t("Set as Default")}
                                </Button>
                            }
                            <Button
                                variant="outlined"
                                startIcon={<Visibility />}
                                onClick={() => onViewDetails({ id: configuredItem?.id })}
                                sx={{ ...buttonSx, flex: 1, minWidth: 0 }}
                            >
                                {i18nLocal.t("Details")}
                            </Button>
                        </>
                    }
                </div>
            </CardContent>
        </Card >
    )
}

export default MainCard
