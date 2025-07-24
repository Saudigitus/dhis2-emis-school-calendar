import React from 'react';
import Item from './menuItem';
import styles from './menu.module.css'
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import AlertDialog from '../confirm/confirm';
import { IconButton, MenuList, Popover } from "@mui/material";

const options = [
    {
        icon: <Edit />,
        label: "Edit",
        link: "/edit",
        className: styles.edit_option,
        type: "edit"
    },
    {
        icon: <Delete />,
        label: "Delete",
        link: "/delete",
        className: styles.delete_option,
        type: "delete"
    }
]

export default function MenuComponent({
    row,
    setOpen,
    setSelected,
    setDeleted
}: { row: any, setOpen: (value: boolean) => void, setSelected: (e: any) => void, setDeleted: (e: any) => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const open = Boolean(anchorEl);


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
                style={{ marginTop: '-10px' }}
            >
                {/* <CircularLoader small /> : */}
                <MoreHoriz />
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
                <MenuList style={{ maxWidth: '100%' }}>
                    {options.map((option) =>
                        <Item
                            row={row}
                            {...option}
                            onClick={() => Actions(option.type, row)}
                        />
                    )}
                </MenuList>
            </Popover>
            <AlertDialog setDeleted={setDeleted} row={row} open={confirm} setOpen={setConfirm} />
        </div>
    );
}
