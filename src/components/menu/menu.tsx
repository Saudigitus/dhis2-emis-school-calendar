import Item from './menuItem';
import styles from './menu.module.css'
import React, { useEffect, useState } from 'react';
import AlertDialog from '../confirm/confirm';
import { useSetRecoilState } from 'recoil';
import { editState } from '../../schema/editDataSchema';
import { deleteState } from '../../schema/deleteDataSchema';
import { IconButton, MenuList, Popover } from "@mui/material";
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';

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

export default function MenuComponent(props: { row: any, setOpen: (value: boolean) => void, onDelete: () => void }) {
    const { row, setOpen, onDelete } = props;
    const setSelected = useSetRecoilState(editState)
    const setDeleted = useSetRecoilState(deleteState)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (confirmDelete) {
            onDelete()
            setOpenDeleteDialog(false)
        }
    }, [confirmDelete])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Actions = async (type: string, row: any) => {
        handleClose()
        if (type === 'delete') {
            setOpenDeleteDialog(true)
            setDeleted({ data: row, delete: true })
        } else if (type === 'edit') {
            setOpen(true)
            setSelected({ data: row, edit: true })
        }
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                style={{ marginTop: '-10px' }}
            >
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
            <AlertDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} setAgree={setConfirmDelete} />
        </div>
    );
}
