"use client"

import {useList} from "@/src/hooks/lists/useList";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {Card} from "@/src/modules/card/Card";
import {ListControls} from "@/src/modules/list/listControls/ListControls";
import {ListItems} from "@/src/modules/list/listItems/ListItems";


interface ListOverviewFragmentProps {
    listId: number
}

export function ListOverviewFragment({ listId }: ListOverviewFragmentProps) {

    const { data: list, update: updateList } = useList(listId);
    const { data: user } = useLoggedInUser();


    if (!list || !user) {
        return <Card>
            loading...
        </Card>
    }


    return <>
        <ListControls loggedInUser={user} list={list} updateList={updateList}/>
        <ListItems list={list} updateList={updateList} loggedInUser={user}/>
    </>;
}