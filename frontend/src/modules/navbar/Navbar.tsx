
import styles from "./Navbar.module.css"

interface NavbarProps {
    // TODO
    todo: number
}

export function Navbar({}: NavbarProps) {
    return <div className={styles.container}>
        <div className={styles.body}>
            <a className={styles.logo}>🍔</a>
            <a className={styles.navLink}>TODO Home</a>
            <a className={styles.navLink}>TODO Login</a>
        </div>
    </div>
}