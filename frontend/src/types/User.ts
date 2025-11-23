export interface User{
    _id: string,
    name: string,
}

export const DEBUG_USER: User = {
    _id: "0",
    name: "Logged in test user",
}

export const DEBUG_USERS: User[] = [
    DEBUG_USER,
    {
        _id: "1",
        name: "ABC DEF"
    },
    {
        _id: "2",
        name: "GHI JKL"
    }
];