import React, {useEffect, useState} from "react";
import styles from "./Toast.module.css"


interface ToastProps {
    type: "info" | "error";
    message: string;
}

export function Toast({type, message}: ToastProps){
    // TODO : implement toasts on failed server calls
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        
        if (!visible) {
            return;
        }
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [visible]);

    return {
        element: (
        <div className={styles.container}><div className={`${styles.toast} ${type === "info" ? styles.info : styles.error}`}>
            {message}
        </div></div>
        ),
        activate: ()=> {setVisible(true)}
    };
}

