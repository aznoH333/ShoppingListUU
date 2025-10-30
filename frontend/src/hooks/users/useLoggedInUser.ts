import {DEBUG_USER, DEBUG_USERS, User} from "@/src/types/User";
import {useState} from "react";


// TODO : session storage

export function useLoggedInUser() {

    const [data] = useState<User | undefined>(DEBUG_USER);

    return {
        data,
    };
}