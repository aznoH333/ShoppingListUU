import {ShoppingListUser} from "@/src/types/ShoppingListUser";
import {User} from "@/src/types/User";
import React from "react";
import {UserCard} from "@/src/modules/user/userCard/UserCard";
import styles from "./UserList.module.css"


export interface UserListButton {
    label: string,
    function: (id: number)=>void,
    dontShowForUsers?: number[], // an array of ids of users for which the buttons shouldn't display
}


interface UserListProps {
    users: User[] | ShoppingListUser[];
    buttons?: UserListButton;
}

export function UserList({ users, buttons }: UserListProps) {
    return (
        <div className={styles.list}>
            {users.map((it) => {
                const isShoppingListUser = 'role' in it; // Check if userItem is ShoppingListUser
                return (
                    <UserCard
                        key={isShoppingListUser ? it.user.id : it.id}
                        user={isShoppingListUser ? it.user : it}
                        userRole={isShoppingListUser ? it.role : undefined}
                        button={buttons}
                    />
                );
            })}
        </div>
    );
}