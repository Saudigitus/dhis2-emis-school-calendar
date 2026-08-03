import Item from './menuItem';
import styles from './menu.module.css'
import React, { useEffect, useState } from 'react';
import AlertDialog from '../confirm/confirm';
import { useSetRecoilState } from 'recoil';
import { editState } from '../../schema/editDataSchema';
import { deleteState } from '../../schema/deleteDataSchema';
import { IconButton, MenuList, Popover } from "@mui/material";
import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';


export default function MenuComponent(props: { scrollToTop: any, i18n: D2I18n, row: any, onDelete: () => void }) {
    const { row, onDelete, i18n, scrollToTop } = props;
    const setSelected = useSetRecoilState(editState)
    const setDeleted = useSetRecoilState(deleteState)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options = [
        {
            icon: <Edit />,
            label: i18n.t("Edit"),
            link: "/edit",
            className: styles.edit_option,
            type: "edit"
        },
        {
            icon: <Delete />,
            label: i18n.t("Delete"),
            link: "/delete",
            className: styles.delete_option,
            type: "delete"
        }
    ]

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
            setSelected({ data: row, edit: true })
            requestAnimationFrame(() => {
                scrollToTop()
            })
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
                            onClick={() => {
                                Actions(option.type, row)
                            }}
                        />
                    )}
                </MenuList>
            </Popover>
            <AlertDialog i18n={i18n} open={openDeleteDialog} setOpen={setOpenDeleteDialog} setAgree={setConfirmDelete} />
        </div>
    );
}
