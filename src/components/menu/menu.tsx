import React from 'react';
import {Delete, Edit} from '@material-ui/icons';

export default function Actions({row}: { row: any }) {

    return <div>
        <Edit style={{color:"#A9BCD0"}} />
        <Delete style={{color:'#D91E36'}} />
    </div>
}
