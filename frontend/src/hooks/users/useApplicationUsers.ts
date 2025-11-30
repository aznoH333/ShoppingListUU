import {User} from "@/src/types/User";
import {useEffect, useState} from "react";

export function useApplicationUsers() {

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<undefined | string>(undefined);


    useEffect(() => {

        const fetchUsers = async () => {
            const response = await fetch(`http://localhost:8000/users/`);
            const data = await response.json();
            setData(data);

        };

        fetchUsers().catch((e)=> {
            setLoading(false);
            console.error(e);
            setError(e);
        }).then(()=>{
            setLoading(false);

        });

    }, []);

    return {
        data,
        loading,
        error
    }
}