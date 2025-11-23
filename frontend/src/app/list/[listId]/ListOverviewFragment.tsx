"use client"

import {useList} from "@/src/hooks/lists/useList";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {Card} from "@/src/modules/card/Card";
import {ListControls} from "@/src/modules/list/listControls/ListControls";
import {ListItems} from "@/src/modules/list/listItems/ListItems";
import {LoadingCard} from "@/src/modules/loadingCard/LoadingCard";


interface ListOverviewFragmentProps {
    listId: string
}

export function ListOverviewFragment({ listId }: ListOverviewFragmentProps) {

    console.debug(listId);
    const { data: list, setData: updateList, loading: loadingUser, error: errorUser } = useList(listId);
    const { data: user } = useLoggedInUser();


    if (loadingUser || errorUser || !user || !list || !updateList) {
        return <>
            <LoadingCard heightPx={174} error={errorUser}/>
            <LoadingCard heightPx={381} error={errorUser}/>
        </>
    }


    return <>
        <ListControls loggedInUser={user} list={list} updateList={updateList}/>
        <ListItems list={list} updateList={updateList} loggedInUser={user}/>
    </>;
}