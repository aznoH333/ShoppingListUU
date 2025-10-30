import {User} from "@/src/types/User";

export interface ShoppingListUser {
    id: number,
    user: User,
    role: "owner" | "member",
}