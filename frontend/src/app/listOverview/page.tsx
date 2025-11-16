"use client"

import {Card} from "@/src/modules/card/Card";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {DEBUG_SHOPPING_LIST, EMPTY_SHOPPING_LIST, MEMBER_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";
import {ListCard} from "@/src/modules/listOverview/listCard/ListCard";
import {ListCardDisplay} from "@/src/modules/listOverview/listCardDisplay/ListCardDisplay";
import {ListOverviewControls} from "@/src/modules/listOverview/listOverviewControlls/ListOverviewControls";
import {useState} from "react";


export default function ListOverview() {
    const loggedInUser = useLoggedInUser();

    const [ownedLists, setOwnedLists] = useState<ShoppingList[]>([DEBUG_SHOPPING_LIST, MEMBER_SHOPPING_LIST, EMPTY_SHOPPING_LIST]);


    if (loggedInUser.data === undefined) {
        return <div>
            TODO : redirect to homepage/login?
        </div>
    }

    const onListDelete = (listId: number)=> {
        setOwnedLists(ownedLists.filter((it)=>it.id !== listId));
    }

    const onListArchive = (listId: number) => {
        const lists = [...ownedLists];

        const list = lists.find((it)=>it.id === listId);

        if (!list) {
            return;
        }
        list.state = list.state === "active" ? "archived" : "active";
        setOwnedLists(lists);
    }

    const onListAdd = (list: ShoppingList) => {
        if (list.name === "") {
            return;
        }
        const lists = [...ownedLists];
        lists.push(list);
        setOwnedLists(lists);
    }

    return <>
        <Card>
            <ListOverviewControls loggedInUser={loggedInUser.data} onListAdd={onListAdd}/>
        </Card>
        <Card>
            <ListCardDisplay lists={ownedLists} loggedInUser={loggedInUser.data} onListDelete={onListDelete} onListArchive={onListArchive}/>
        </Card>
    </>

}