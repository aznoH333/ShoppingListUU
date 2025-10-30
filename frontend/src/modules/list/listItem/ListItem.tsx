import React from 'react';
import styles from './ShoppingListItem.module.css';
import {Button} from "@/src/modules/input/button/Button";

export interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
    state: "visible" | "checked";
}

interface ShoppingListItemProps {
    listItem: ShoppingListItem;
    checkButtonClicked: (id: number) => void;
}

export function ListItem({ listItem, checkButtonClicked }: ShoppingListItemProps) {
    return (
        <div className={`${styles.card} ${listItem.state === "checked" ? styles.checked : styles.visible}`}>
            <div className={styles.info}>
                <div className={styles.name}>{listItem.name}</div>
                <div className={styles.quantity}>{listItem.quantity}</div>
            </div>
            <Button onClick={()=>{checkButtonClicked(listItem.id)}}>
                {listItem.state === "checked" ? "Revert" : "Done"}
            </Button>
        </div>
    );
}