import React from 'react';
import Item from './menuItem';
import styles from './menu.module.css'
import {Delete, Edit, MoreHoriz} from '@material-ui/icons';
import {CircularLoader} from "@dhis2/ui";
import AlertDialog from '../confirm/confirm';
import {IconButton, MenuList, Popover} from "@material-ui/core";
import {useSetRecoilState} from "recoil";
import {editState} from "../../schema/editDataSchema";

const options = [
    {
        icon: <Edit/>,
        label: "Edit",
        link: "/edit",
        className: styles.edit_option,
        type: "edit"
    },
    {
        icon: <Delete/>,
        label: "Delete",
        link: "/delete",
        className: styles.delete_option,
        type: "delete"
    }
]

export default function MenuComponent({
                                          row,
                                          setOpen
                                      }: { row: any, setOpen: (value: boolean) => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const open = Boolean(anchorEl);
    const setSelected = useSetRecoilState(editState)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Actions = async (type: string, row: any) => {
        handleClose()
        if (type === 'delete') {
            setConfirm(true)
        } else if (type === 'edit') {
            setOpen(true)
            setSelected({
                data: row,
                edit: true
            })
        }
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                style={{marginTop: '-10px'}}
            >
                {/* <CircularLoader small /> : */}
                <MoreHoriz/>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <MenuList style={{maxWidth: '100%'}}>
                    {options.map((option) =>
                        <Item
                            row={row}
                            {...option}
                            onClick={() => Actions(option.type, row)}
                        />
                    )}
                </MenuList>
            </Popover>
            <AlertDialog row={row} open={confirm} setOpen={setConfirm}/>
        </div>
    );
}
