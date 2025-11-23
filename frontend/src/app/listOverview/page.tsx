"use client"

import {Card} from "@/src/modules/card/Card";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {ShoppingList} from "@/src/types/ShoppingList";
import {ListCardDisplay} from "@/src/modules/listOverview/listCardDisplay/ListCardDisplay";
import {ListOverviewControls} from "@/src/modules/listOverview/listOverviewControlls/ListOverviewControls";
import {useState} from "react";
import {useLists} from "@/src/hooks/lists/useLists";
import {LoadingCard} from "@/src/modules/loadingCard/LoadingCard";


export default function ListOverview() {
    const loggedInUser = useLoggedInUser();

    const {data: ownedLists, setData: setOwnedLists, error, loading} = useLists();

    // const [ownedLists, setOwnedLists] = useState<ShoppingList[]>([DEBUG_SHOPPING_LIST, MEMBER_SHOPPING_LIST, EMPTY_SHOPPING_LIST]);
    const [listFilter, setListFilter] = useState<"all" | "archived" | "active">("all");


    if (loggedInUser.data === undefined) {
        return <div>
            TODO : redirect to homepage/login?
        </div>
    }


    if (loading || error) {
        return <>
            <LoadingCard heightPx={61}/>
            <LoadingCard heightPx={150}/>
        </>
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

    const filteredLists = ownedLists.filter((it)=>{
        switch (listFilter) {
            case "all":
                return true;
            case "archived":
                return it.state === "archived";
            case "active":
                return it.state === "active";
        }
    });

    return <>
        <Card>
            <ListOverviewControls loggedInUser={loggedInUser.data} onListAdd={onListAdd} listFilter={listFilter} setListFilter={setListFilter}/>
        </Card>
        <Card>
            <ListCardDisplay lists={filteredLists} loggedInUser={loggedInUser.data} onListDelete={onListDelete} onListArchive={onListArchive}/>
        </Card>
    </>

}