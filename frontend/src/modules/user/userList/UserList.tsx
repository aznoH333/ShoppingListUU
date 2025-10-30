import {ShoppingListUser} from "@/src/types/ShoppingListUser";
import {User} from "@/src/types/User";
import React from "react";
import {UserCard} from "@/src/modules/user/userCard/UserCard";

interface UserListProps {
    users: User[] | ShoppingListUser[];
    buttons?: React.ReactNode;
}

export function UserList({ users, buttons }: UserListProps) {
    return (
        <div>
            {users.map((it) => {
                const isShoppingListUser = 'role' in it; // Check if userItem is ShoppingListUser
                return (
                    <UserCard
                        key={isShoppingListUser ? it.user.id : it.id}
                        user={isShoppingListUser ? it.user : it}
                        userRole={isShoppingListUser ? it.role : undefined}
                        buttons={buttons}
                    />
                );
            })}
        </div>
    );
}