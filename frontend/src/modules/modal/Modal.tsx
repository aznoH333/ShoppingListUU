import {Button} from "@/src/modules/input/button/Button";
import styles from "./Modal.module.css"
import React from "react";


interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onConfirm?: () => void;
    setIsOpen: (value: boolean)=>void
}

export function Modal({isOpen, children, onConfirm, setIsOpen}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalBody}>
                    {children}
                </div>
                <div className={styles.modalFooter}>
                    {onConfirm && (<Button onClick={onConfirm}>Confirm</Button>)}
                    <Button onClick={()=>setIsOpen(false)}>Close</Button>
                </div>
            </div>
        </div>
    );
}