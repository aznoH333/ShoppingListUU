


import styles from "./ListItems.module.css";
import {ShoppingList} from "@/src/types/ShoppingList";
import {Card} from "@/src/modules/card/Card";


interface ListItemsProps {
    list: ShoppingList,
}

export function ListItems({list}: ListItemsProps) {
    return <Card>
        <div>
            aa
        </div>
    </Card>
}