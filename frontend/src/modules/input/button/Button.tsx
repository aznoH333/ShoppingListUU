import styles from "./Button.module.css"

export type ButtonStyle = "active" | "faded" | "warning";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: ()=>void;
    disabled?: boolean;
    type?: ButtonStyle
}


export function Button({children, className, onClick, disabled = false, type = "active"}: ButtonProps) {
    return <button
        className={`${styles.button} ${className ?? ""} ${disabled ? styles.disabled : styles[type]}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
}