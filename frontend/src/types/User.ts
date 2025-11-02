export interface User{
    id: number,
    name: string,
}

export const DEBUG_USER: User = {
    id: 0,
    name: "Logged in test user",
}

export const DEBUG_USERS: User[] = [
    DEBUG_USER,
    {
        id: 1,
        name: "ABC DEF"
    },
    {
        id: 2,
        name: "GHI JKL"
    }
];