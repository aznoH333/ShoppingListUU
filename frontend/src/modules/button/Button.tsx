import styles from "./Button.module.css"


interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: ()=>void;
    disabled?: boolean;
}


export function Button({children, className, onClick, disabled = false}: ButtonProps) {
    return <button
        className={`${styles.button} ${className ?? ""} ${disabled ? styles.disabled : styles.active}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
}