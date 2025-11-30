import {User} from "@/src/types/User";
import {useEffect, useState} from "react";



export function useLoggedInUser() {
    // TODO : session storage, right now the user id is hardcoded
    const [data, setData] = useState<User | undefined>(undefined);


    useEffect(() => {
        const fetchShoppingList = async () => {
            const response = await fetch(`http://localhost:8000/users/691b366b2774443334e5e0cd`);
            const data = await response.json();
            setData(data);
        };

        fetchShoppingList();
    }, []);

    return {
        data,
    };
}