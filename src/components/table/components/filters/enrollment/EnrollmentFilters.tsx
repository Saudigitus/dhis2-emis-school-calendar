import React from 'react'
import ContentFilter from './ContentFilter';
import { useHeader } from '../../../../../hooks/tableHeader/useHeader';

function EnrollmentFilters(): React.ReactElement {
    const { columns } = useHeader()
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginBottom: 10, marginTop: 10, marginLeft: 10 }}>
            {columns ? <ContentFilter headers={columns.filter(header => header.searchable)} /> : null}
        </div>
    )
}

export default EnrollmentFilters
