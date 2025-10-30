import {ShoppingListItem} from "@/src/types/ShoppingListItem";
import {DEBUG_USERS, User} from "@/src/types/User";
import {ShoppingListUser} from "@/src/types/ShoppingListUser";

export interface ShoppingList {
    id: number,
    name: string,
    users: ShoppingListUser[],
    items: ShoppingListItem[],
}

export const DEBUG_SHOPPING_LIST: ShoppingList = {
    id: 0,
    name: "debug list",
    users: [
        {
            id: 0,
            user: DEBUG_USERS[0],
            role: "owner",
        },
        {
            id: 0,
            user: DEBUG_USERS[1],
            role: "member",
        }
    ],

    items: [
        {
            id: 0,
            name: "beans",
            quantity: 2,
            state: "visible",
        },
        {
            id: 1,
            name: "sunflower oil",
            quantity: 1,
            state: "checked",
        }
    ],
}

export function shoppingListGetUserAsListUser(user: User, shoppingList: ShoppingList): ShoppingListUser | undefined {
    return shoppingList.users.find((it)=> it.id === user.id );
}