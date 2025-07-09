import React, { useState } from 'react'
import { Tab, TabBar } from '@dhis2/ui'
import { NonSchoolDays, Terms } from '../pages'

function Repeatable() {
    const [selected, setSelected] = useState('nonschool')

    const types = [
        { name: 'Non School Days', id: 'nonschool' },
        { name: 'Terms', id: 'terms' },
    ]
    return (
        <div>

            <TabBar>
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
            </TabBar>

            <div className='mt-2'>
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