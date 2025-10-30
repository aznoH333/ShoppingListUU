import {DEBUG_USERS} from "@/src/types/User";

export function useApplicationUsers() {
    return {
        get: ()=> {
            return DEBUG_USERS;
        }
        // TODO api call
    }
}