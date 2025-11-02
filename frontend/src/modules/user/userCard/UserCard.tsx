import {User} from "@/src/types/User";
import React from "react";
import styles from "./UserCard.module.css"
import {UserListButton} from "@/src/modules/user/userList/UserList";
import {Button} from "@/src/modules/input/button/Button";

interface UserCardProps {
    user: User;
    userRole?: undefined | 'owner' | 'member';
    button?: UserListButton;
}

export function UserCard({ user, userRole, button }: UserCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.name}>{user.name}</div>
                {userRole && <div className={styles.role}>{userRole}</div>}
            </div>
            {button && (<div className={styles.buttons}>
                <Button onClick={()=>{button?.function(user.id)}}>
                    {button.label}
                </Button>
            </div>)}


        </div>
    );
}