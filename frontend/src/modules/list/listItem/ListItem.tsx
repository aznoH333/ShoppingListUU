import React from 'react';
import styles from './ListItem.module.css';
import {Button} from "@/src/modules/input/button/Button";

export interface ShoppingListItem {
    id: string;
    name: string;
    quantity: number;
    state: "visible" | "checked";
}

interface ShoppingListItemProps {
    listItem: ShoppingListItem;
    checkButtonClicked?: (id: string) => void;
}

export function ListItem({ listItem, checkButtonClicked }: ShoppingListItemProps) {
    return (
        <div className={`${styles.card} ${listItem.state === "checked" ? styles.checked : styles.visible}`}>
            <div className={styles.info}>
                <div className={styles.name}>{listItem.name}</div>
                <div className={styles.quantity}>{listItem.quantity}x</div>
            </div>
            {checkButtonClicked && (
                <Button onClick={()=>{checkButtonClicked(listItem.id)}} type={listItem.state === "checked" ? "faded" : "active"}>
                    {listItem.state === "checked" ? "Revert" : "Done"}
                </Button>
            )}
        </div>
    );
}