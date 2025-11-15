
import styles from "./Navbar.module.css"
import Link from "next/link";

interface NavbarProps {
    // TODO
    todo: number
}

export function Navbar({}: NavbarProps) {
    return <div className={styles.container}>
        <div className={styles.body}>
            <Link className={styles.navLink} href={"/"}>Home</Link>
            <a className={styles.navLink}>Login</a>
        </div>
    </div>
}