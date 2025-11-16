import styles from "./ListCardDisplay.module.css"
import {ShoppingList} from "@/src/types/ShoppingList";
import {User} from "@/src/types/User";
import {ListCard} from "@/src/modules/listOverview/listCard/ListCard";

interface ListCardDisplayProps {
    lists: ShoppingList[],
    loggedInUser: User,
    onListDelete: (listId: number)=>void;
    onListArchive: (listId: number)=>void;
}
export function ListCardDisplay({lists, loggedInUser, onListDelete, onListArchive}: ListCardDisplayProps) {
    return <div className={styles.display}>
        {lists.map((it, index)=>(<ListCard key={index} list={it} loggedInUser={loggedInUser} onListArchive={onListArchive} onListDelete={onListDelete}/>))}
    </div>
}