import {User} from "@/src/types/User";
import {ShoppingList} from "@/src/types/ShoppingList";
import styles from "./ListControls.module.css";
import {Card} from "@/src/modules/card/Card";

interface ListControlsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void
}

export function ListControls({loggedInUser, list, updateList}: ListControlsProps){


    return <Card>
        <div className={styles.title}>
            {list.name}
        </div>
    </Card>


}