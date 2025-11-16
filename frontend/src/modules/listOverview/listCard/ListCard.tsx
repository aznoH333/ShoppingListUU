
import styles from "./ListCard.module.css"
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import {User} from "@/src/types/User";
import {getUserRightsForAList} from "@/src/types/ShoppingListUser";
import {Button} from "@/src/modules/input/button/Button";

interface ListCardProps {
    list: ShoppingList,
    loggedInUser: User,
}

export function ListCard({list, loggedInUser}: ListCardProps) {
    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const userRights = getUserRightsForAList(listUser);


    const completedCount = list.items.filter((it)=>it.state == "checked").length


    return <div className={styles.card}>
        <div className={styles.cardRow}>
            <div className={styles.title}>{list.name}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Completed {completedCount}/{list.items.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Members {list.users.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.buttons}>
                {userRights.canArchiveList && (
                    <Button onClick={() => {
                        alert("TODO")
                    }}>Archive</Button>
                )}

                {userRights.canDeleteList && (
                    <Button onClick={() => {
                        alert("TODO")
                    }}>Delete</Button>
                )}



            </div>
            <div className={styles.buttons}>
                <Button onClick={() => {
                    alert("TODO")
                }}>View</Button>


            </div>
        </div>
    </div>
}