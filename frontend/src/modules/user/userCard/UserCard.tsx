import {User} from "@/src/types/User";
import React from "react";
import styles from "./UserCard.module.css"
import {UserListButton} from "@/src/modules/user/userList/UserList";
import {Button} from "@/src/modules/input/button/Button";
import {UserRole} from "@/src/types/ShoppingListUser";

interface UserCardProps {
    user: User;
    userRole?: UserRole | undefined;
    button?: UserListButton;
}

export function UserCard({ user, userRole, button }: UserCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.name}>{user.name}</div>
                {userRole && <div className={styles.role}>{userRole}</div>}
            </div>
            {button && !button.dontShowForUsers?.includes(user.id) && (<div className={styles.buttons}>
                <Button onClick={()=>{button?.function(user.id)}}>
                    {button.label}
                </Button>
            </div>)}


        </div>
    );
}