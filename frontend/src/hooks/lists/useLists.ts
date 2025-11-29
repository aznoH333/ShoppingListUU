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

    const addList = async (list: ShoppingList) => {
        try {
            const response = await fetch('http://localhost:8000/shoppingList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...list, _id: list.id}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New list added:', data);
            }
        } catch (error) {
            console.error('Error adding list:', error);
        }
    }

    const deleteList = async (listId: string) => {
        try {
            const response = await fetch(`http://localhost:8000/shoppingList/${listId}`, {
                method: 'DELETE',

            });

            if (response.ok) {
                const data = await response.json();
                console.log('List deleted');
            }
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    }

    const updateList = async (listId: string, shoppingList: ShoppingList) => {
        try {
            const response = await fetch(`http://localhost:8000/shoppingList/${listId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...shoppingList, _id: listId}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('List deleted');
            }
        } catch (error) {
            console.error('Error updating list:', error);
        }
    }

    return {
        data,
        setData,
        loading,
        error,
        addList,
        deleteList,
        updateList
    }
}