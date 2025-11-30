import {ShoppingList} from "@/src/types/ShoppingList";
import {useEffect, useState} from "react";
import {useListOperations} from "@/src/hooks/lists/useListOperations";


export function useList(listId: string) {

    const [data, setData] = useState<ShoppingList|undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const {updateList} = useListOperations();


    useEffect(() => {

        const fetchShoppingList = async () => {
            const response = await fetch(`http://localhost:8000/shoppingList/${listId}`);

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
        update: (list: ShoppingList | undefined)=> {
            if (!list) {
                return
            }

            updateList(list.id, list).catch((e)=>{
                console.error(e);
            }).then(()=>{
                setData(list);
            })
        },
        loading,
        error
    }




}