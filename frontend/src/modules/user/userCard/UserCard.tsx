import {User} from "@/src/types/User";
import React from "react";
import styles from "./UserCard.module.css"

interface UserCardProps {
    user: User;
    userRole?: undefined | 'owner' | 'member';
    buttons?: React.ReactNode;
}

export function UserCard({ user, userRole, buttons }: UserCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.name}>{user.name}</div>
                {userRole && <div className={styles.role}>{userRole}</div>}
            </div>
            <div className={styles.buttons}>{buttons}</div>
        </div>
    );
}