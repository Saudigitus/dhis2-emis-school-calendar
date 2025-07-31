import React, { useState } from 'react'
import { Tab, TabBar } from '@dhis2/ui'
import { NonSchoolDays, Terms } from '../pages'
import GeneralDetailsForm from '../components/forms/GeneralDetailsForm'
import { WithPadding } from '../components'
import styles from './repeatable.module.css'
import { useNavigate } from 'react-router-dom'

function Repeatable() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('general')

    const types = [
        { name: 'General Details', id: 'general' },
        { name: 'School Terms', id: 'terms' },
        { name: 'Non School Days', id: 'nonschool' }
    ]
    return (
        <div>
            <WithPadding padding='0px 0px 0px 20px'>
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
                        Back to list
                    </Tab>
                </TabBar>
            </WithPadding>

            <div className='mt-2'>
                {selected === 'general' &&
                    <GeneralDetailsForm />
                }
                {selected === 'nonschool' &&
                    <NonSchoolDays />
                }
                {selected === 'terms' &&
                    <Terms />
                }
            </div>
        </div>
    )
}

export default Repeatable