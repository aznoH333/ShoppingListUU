import React from 'react';
import {ListItem} from "@/src/modules/list/listItem/ListItem";
import {ShoppingListItem} from "@/src/types/ShoppingListItem";

interface ItemListProps {
    items: ShoppingListItem[];
    checkButtonClicked: (id: number) => void;
}

export function ItemList({ items, checkButtonClicked }: ItemListProps) {
    return (
        <div>
            {items.map((item) => (
                <ListItem
                    key={item.id}
                    listItem={item}
                    checkButtonClicked={() => checkButtonClicked(item.id)}
                />
            ))}
        </div>
    );
}
