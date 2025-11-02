import {User} from "@/src/types/User";


export type UserRole = "owner" | "member" | "visitor"


export interface ShoppingListUser {
    id: number,
    user: User,
    role: UserRole,
}


/**
 * Describes what action can a role do in a shopping list
 */
interface UserRight {
    canAddUsers: boolean,
    canEditList: boolean,
    canRemoveUsers: boolean,
    canLeave: boolean,
}


const USER_RIGHTS: Record<UserRole, UserRight> = {
    "owner": {
        canAddUsers: true,
        canEditList: true,
        canRemoveUsers: true,
        canLeave: false,
    },
    "member": {
        canAddUsers: false,
        canEditList: false,
        canRemoveUsers: false,
        canLeave: true,
    },
    "visitor": {
        canAddUsers: false,
        canEditList: false,
        canRemoveUsers: false,
        canLeave: false,
    }
}

export function getUserRightsForAList(user?: ShoppingListUser): UserRight {
    return USER_RIGHTS[user?.role ?? "visitor"];
}