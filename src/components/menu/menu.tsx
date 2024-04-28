import React from 'react';
import styles from './menu.module.css'
import { Delete, Edit, Visibility } from '@material-ui/icons';

const options = [
  {
    icon: <Visibility />,
    label: "Preview",
    link: "/preview",
    view: true,
    className: styles.preview_option,
    type: "preview"
  },
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


export default function MenuComponent({ row }: { row: any }) {
  // const navigate = useNavigate()
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [confirm, setConfirm] = React.useState<boolean>(false);
  // const open = Boolean(anchorEl);
  // const { getFileResource } = useFileResource()
  // const { loading: loadDataStoreUpdate } = useCreateDsTemplate()
  // const { preview, loadPreview } = PreviewComponent()
  // const { objects, loading: loadfile, getData } = getFileResource({ fileId: row.fileId, lazy: true })
  //
  // React.useEffect(() => {
  //   (async () => {
  //     let rs = await objects?.text()
  //     if (rs) preview(rs)
  //   })();
  // }, [objects])
  //
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  //
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //
  // const Actions = async (type: string, row: any) => {
  //   handleClose()
  //   if (type === 'delete') {
  //     setConfirm(true)
  //   } else if (type === 'edit') {
  //     navigate(`/new-template?program=${row.program}&templateName=${row.name}&id=${row.id}&fileId=${row.fileId}&documentId=${row.documentId}`)
  //   } else if (type === 'preview') {
  //     getData()
  //   }
  // }
  //
  // return (
  //   <div>
  //     <IconButton
  //       onClick={handleClick}
  //     >
  //       {!!(loadfile || loadPreview || loadDataStoreUpdate) ? <CircularLoader small /> : <MoreVertIcon />}
  //     </IconButton>
  //
  //     <Menu
  //       open={open}
  //       anchorEl={anchorEl}
  //       onClose={handleClose}
  //       PaperProps={{
  //         style: { width: '170px', padding: '0px 5px' },
  //       }}
  //     >
  //       <MenuList style={{ maxWidth: '100%' }}>
  //         {options.map((option) =>
  //           <Item
  //             row={row}
  //             {...option}
  //             onClick={() => Actions(option.type, row)}
  //           />
  //         )}
  //       </MenuList>
  //     </Menu>
  //     <AlertDialog row={row} open={confirm} setOpen={setConfirm} />
    return <></>
}
