export interface User{
    id: number,
    name: string,
}

export const DEBUG_USER: User = {
    id: 0,
    name: "test user",
}

export const DEBUG_USERS: User[] = [
    DEBUG_USER,
    {
        id: 1,
        name: "test user 2"
    },
    {
        id: 2,
        name: "test user 3"
    }
];