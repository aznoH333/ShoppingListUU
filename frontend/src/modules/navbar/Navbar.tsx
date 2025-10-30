
import styles from "./Navbar.module.css"

interface NavbarProps {
    // TODO
    todo: number
}

export function Navbar({}: NavbarProps) {
    return <div className={styles.container}>
        <div className={styles.body}>
            <a className={styles.logo} href={"/"}>🍔</a>
            <a className={styles.navLink}>Home</a>
            <a className={styles.navLink}>Login</a>
        </div>
    </div>
}