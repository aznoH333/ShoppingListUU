import {DEBUG_SHOPPING_LIST, EMPTY_SHOPPING_LIST, MEMBER_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";
import {useState} from "react";


export function useList(listId: number) {

    const lists = [
        DEBUG_SHOPPING_LIST,
        MEMBER_SHOPPING_LIST,
        EMPTY_SHOPPING_LIST,
    ]

    const [data, setData] = useState<ShoppingList | undefined>(listId > lists.length ? EMPTY_SHOPPING_LIST : lists[listId]);



    return {
        data,
        update: (list: ShoppingList) => {
            setData(list); // TODO : api call
        }
    }
}