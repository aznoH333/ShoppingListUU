import {ShoppingListItem} from "@/src/types/ShoppingListItem";
import {DEBUG_USERS, User} from "@/src/types/User";
import {ShoppingListUser} from "@/src/types/ShoppingListUser";


export interface ShoppingList {
    id: number,
    name: string,
    users: ShoppingListUser[],
    items: ShoppingListItem[],
    state: "active" | "archived"
}



export const EMPTY_SHOPPING_LIST: ShoppingList = {
    id: 2,
    name: "new list",
    users: [
        {
            _id: "691b366b2774443334e5e0cd",
            user: {
                _id: "691b366b2774443334e5e0cd",
                name: "testUser",
            },
            role: "owner",
        },
    ],

    items: [

    ],
    state: "active",

}

export function shoppingListGetUserAsListUser(user: User, shoppingList: ShoppingList): ShoppingListUser | undefined {

    console.debug(user);

    return shoppingList.users.find((it)=> it.user._id === user._id );
}