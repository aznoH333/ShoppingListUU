import {DEBUG_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";
import {useEffect, useState} from "react";


export function useList(listId: number) {
    const [data, setData] = useState<ShoppingList | undefined>(DEBUG_SHOPPING_LIST);



    return {
        data,
        update: (list: ShoppingList) => {
            setData(list); // TODO : api call
        }
    }
}