"use client"

import {Card} from "@/src/modules/card/Card";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {DEBUG_SHOPPING_LIST, EMPTY_SHOPPING_LIST, MEMBER_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";
import {ListCard} from "@/src/modules/listOverview/listCard/ListCard";
import {ListCardDisplay} from "@/src/modules/listOverview/listCardDisplay/ListCardDisplay";


export default function ListOverview() {
    const loggedInUser = useLoggedInUser();
    const ownedLists: ShoppingList[] = [DEBUG_SHOPPING_LIST, MEMBER_SHOPPING_LIST, EMPTY_SHOPPING_LIST];


    if (loggedInUser.data === undefined) {
        return <div>
            TODO : redirect to homepage/login?
        </div>
    }

    return <Card>
        hello
        <ListCardDisplay lists={ownedLists} loggedInUser={loggedInUser.data}/>
    </Card>
}