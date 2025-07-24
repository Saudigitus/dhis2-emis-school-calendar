import React from "react";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";
import styles from './modal.module.css'

interface ModalProps {
  open: boolean
  onClose: any,
  title: string
  children: React.ReactNode
}

function ModalComponent({
  open,
  onClose,
  title,
  children
}: ModalProps): React.ReactElement {

  return (
    <div>
      {open && <Modal
        className={styles.modal}
        open={open}
        position={"middle"}
        onClose={onClose}
      >
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{children}</ModalContent>
      </Modal>}
    </div>
  );
}

export default ModalComponent;
