"use client"
import styles from "./ListCard.module.css"
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import {User} from "@/src/types/User";
import {getUserRightsForAList} from "@/src/types/ShoppingListUser";
import {Button} from "@/src/modules/input/button/Button";
import {useRouter} from "next/navigation";

interface ListCardProps {
    list: ShoppingList,
    loggedInUser: User,
    onListDelete: (listId: number)=>void;
    onListArchive: (listId: number)=>void;
}

export function ListCard({list, loggedInUser, onListDelete, onListArchive}: ListCardProps) {
    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const userRights = getUserRightsForAList(listUser);

    const router = useRouter();


    const completedCount = list.items.filter((it)=>it.state == "checked").length


    return <div className={styles.card}>
        <div className={styles.cardRow}>
            <div className={list.state === "active" ? styles.title : styles.archived}>{list.name} {list.state === "archived" && <>(Archived)</>}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Completed {completedCount}/{list.items.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Members {list.users.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.buttons}>
                {userRights.canArchiveList && list.state !== "archived" && (
                    <Button onClick={() => {
                        onListArchive(list.id)
                    }}>Archive</Button>
                )}

                {userRights.canDeleteList && list.state !== "archived"  && (
                    <Button onClick={() => {
                        onListDelete(list.id)
                    }}>Delete</Button>
                )}



            </div>
            <div className={styles.buttons}>
                <Button onClick={() => {
                    router.push("/list/" + list.id)
                }}>View</Button>


            </div>
        </div>
    </div>
}