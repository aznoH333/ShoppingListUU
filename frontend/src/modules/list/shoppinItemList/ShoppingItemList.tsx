import React from 'react';
import {ListItem} from "@/src/modules/list/listItem/ListItem";
import {ShoppingListItem} from "@/src/types/ShoppingListItem";
import styles from "./ShoppintItemList.module.css"
import {Button} from "@/src/modules/input/button/Button";

interface ShoppingItemListProps {
    items: ShoppingListItem[];
    checkButtonClicked: (id: number) => void;
}

export function ShoppingItemList({ items, checkButtonClicked }: ShoppingItemListProps) {
    return (
        <div className={styles.list}>
            {items.map((item, index) => (
                <ListItem
                    key={index}
                    listItem={item}
                    checkButtonClicked={() => checkButtonClicked(item.id)}
                />
            ))}
        </div>
    );
}
