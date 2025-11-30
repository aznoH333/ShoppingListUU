import {ShoppingList} from "@/src/types/ShoppingList";

export function useListOperations() {



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
            throw error;

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
            throw error;

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
            throw error;
        }
    }
    return {
        addList,
        updateList,
        deleteList,
    }
}