"use client"
import {Card} from "@/src/modules/card/Card";
import {useList} from "@/src/hooks/lists/useList";
import {useLoggedInUser} from "@/src/hooks/users/useLoggedInUser";
import {ListControls} from "@/src/modules/list/listControls/ListControls";
import {ListItems} from "@/src/modules/list/listItems/ListItems";
import {useParams} from "next/navigation";



export default function ListOverviewPage() {

    const { listId } = useParams();

    const listIdNumber = typeof listId === 'string' ? parseInt(listId, 10) : NaN;


    console.debug(listId);
    const { data: list, update: updateList } = useList(listIdNumber);
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