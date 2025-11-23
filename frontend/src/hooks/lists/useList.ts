import {ShoppingList} from "@/src/types/ShoppingList";
import {useEffect, useState} from "react";


export function useList(listId: string) {

    const [data, setData] = useState<ShoppingList|undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);



    useEffect(() => {

        const fetchShoppingList = async () => {
            const response = await fetch(`http://localhost:3000/shoppingList/${listId}`);
            const data = await response.json();
            setData(data);
        };

        fetchShoppingList().catch((e)=> {
            setLoading(false);
            console.error(e);
            setError(e);
        }).then(()=>{
            setLoading(false);

        });

    }, []);


    return {
        data,
        setData,
        loading,
        error
    }




    return {
        data,
        update: (list: ShoppingList) => {
            setData(list); // TODO : api call
        }
    }
}