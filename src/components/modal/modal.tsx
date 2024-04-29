import React from "react";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import styles from './modal.module.css'
import {useRecoilValue, useSetRecoilState} from "recoil";
import {editState} from "../../schema/editDataSchema";

interface ModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  children: React.ReactNode
}

function ModalComponent({
  open,
  setOpen,
  title,
  children
}: ModalProps): React.ReactElement {

  return (
    <div>
      {open && <Modal
        className={styles.modal}
        open={open}
        position={"middle"}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{children}</ModalContent>
      </Modal>}
    </div>
  );
}

export default ModalComponent;
