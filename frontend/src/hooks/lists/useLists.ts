import {useEffect, useState} from "react";
import {ShoppingList} from "@/src/types/ShoppingList";

export function useLists() {
    const [data, setData] = useState<ShoppingList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {


        const fetchShoppingList = async () => {
            const response = await fetch(`http://localhost:8000/shoppingList/`);
            const data = await response.json();
            setData(data);
        };

        fetchShoppingList().catch((e)=> {
            setLoading(false);
            setError(e);
        }).then(()=>{
            setLoading(false);

        });

    }, []);



    return {
        data,
        setData,
        loading,
        error,
    }
}