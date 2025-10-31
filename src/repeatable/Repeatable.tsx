import React, { useState } from 'react'
import { Tab, TabBar } from '@dhis2/ui'
import { NonSchoolDays, Terms } from '../pages'
import GeneralDetailsForm from '../components/forms/GeneralDetailsForm'
import { WithPadding } from '../components'
import styles from './repeatable.module.css'
import { useNavigate } from 'react-router-dom'
import i18n from '../locales'
import { D2I18n } from 'dhis2-semis-types'

function Repeatable({ i18next }: { i18next: D2I18n }) {
    const i18nLocal = i18next ?? i18n
    const navigate = useNavigate();
    const [selected, setSelected] = useState('general')

    const types = [
        { name: i18nLocal.t('General Details'), id: 'general' },
        { name: i18nLocal.t('School Terms'), id: 'terms' },
        { name: i18nLocal.t('Non School Days'), id: 'nonschool' }
    ]
    return (
        <div>
            <WithPadding padding='0px 0px 0px 0px'>
                <TabBar className={styles.global} >
                    <div>
                        {
                            types.map((type) => (
                                <Tab
                                    key={type.id}
                                    selected={selected === type.id}
                                    onClick={() => setSelected(type.id)}
                                >
                                    {type.name}
                                </Tab>
                            ))
                        }
                    </div>
                    <Tab
                        key={"backtolist"}
                        selected={false}
                        onClick={() => navigate(-1)}
                    >
                        {i18nLocal.t("Back to list")}
                    </Tab>
                </TabBar>
            </WithPadding>

            <div className='mt-2'>
                {selected === 'general' &&
                    <GeneralDetailsForm i18next={i18next} />
                }
                {selected === 'nonschool' &&
                    <NonSchoolDays i18next={i18next} />
                }
                {selected === 'terms' &&
                    <Terms i18next={i18next} />
                }
            </div>
        </div>
    )
}

export default Repeatable