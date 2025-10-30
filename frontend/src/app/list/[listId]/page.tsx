"use client"

import {Card} from "@/src/modules/card/Card";
import {useList} from "@/src/hooks/lists/useList";
import {useState} from "react";
import {ShoppingList} from "@/src/types/ShoppingList";
import {useSearchParams} from "next/navigation";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {ListControls} from "@/src/modules/list/listControls/ListControls";
import {ListItems} from "@/src/modules/list/listItems/ListItems";


interface ListOverviewPage {
    params: string
}

export default function ListOverviewPage({params}: ListOverviewPage) {

    // Retrieve a specific parameter by name
    const listId = parseInt(params as string);

    const { data: list, update: updateList } = useList(listId);
    const { data: user } = useLoggedInUser();




    if (!list || !user) {
        return <Card>
            loading...
        </Card>
    }


    return <>
        <ListControls loggedInUser={user} list={list} updateList={updateList}/>
        <ListItems list={list}/>
    </>;
}