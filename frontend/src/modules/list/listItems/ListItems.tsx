


import styles from "./ListItems.module.css";
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import {Card} from "@/src/modules/card/Card";
import {ShoppingItemList} from "@/src/modules/list/shoppinItemList/ShoppingItemList";
import {Button} from "@/src/modules/input/button/Button";
import React, {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {NumberInput} from "@/src/modules/input/numberInput/NumberInput";
import {getUserRightsForAList} from "@/src/types/ShoppingListUser";
import {User} from "@/src/types/User";
import {List} from "postcss/lib/list";
import {Dropdown} from "@/src/modules/input/dropdown/Dropdown";


interface ListItemsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void,
}

type ListFilter = "all" | "visible" | "checked";

export function ListItems({loggedInUser, list, updateList}: ListItemsProps) {

    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const userRights = getUserRightsForAList(listUser);


    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const [listFilter, setListFilter] = useState<ListFilter>("all");
    const filters: ListFilter[] = ["all", "visible", "checked"];

    const addNewItem = () => {
        // TODO : this is placeholder logic. this will eventually be implemented on the backend
        if (newItemName === "") {
            return;
        }

        const newId = list.items.length > 0 ?
            list.items
                .map((it)=>it.id)
                .reduce((a, acc)=>Math.max(a, acc)) + 1
            : 0;

        updateList({
            ...list,
            items: [...list.items, {
                id: newId,
                name: newItemName,
                quantity: Math.min(Math.max(newItemQuantity, 1), 9999),
                state: "visible",
            }]
        });

        setNewItemModalOpen(false);
    }

    const toggleItemState = (id: number) => {
        const item = list.items.find((it)=>it.id === id);

        if (item === undefined) {
            return;
        }

        item.state = item.state === "visible" ? "checked" : "visible";
        updateList({...list});
    }

    const filteredItems = list.items.filter((it)=>{
       switch (listFilter) {
           case "all":
               return true;
           case "checked":
               return it.state === "checked";
           case "visible":
               return it.state === "visible";
       }
    });


    return <Card>

        <div className={styles.header}>
            <div className={styles.title}>
                Items
            </div>
            <div className={styles.filter}>
                Filter:
                <Dropdown values={filters} defaultValue={listFilter} setValue={setListFilter as (value: string)=>void}/>
            </div>
        </div>


        <div className={styles.itemContainer}>
            <ShoppingItemList items={filteredItems} checkButtonClicked={toggleItemState}/>
        </div>

        {userRights.canAddItems && (
            <div className={styles.buttonContainer}>
                <Button onClick={()=>{setNewItemModalOpen(true)}}>Add new item</Button>
            </div>
        )}


        <Modal isOpen={newItemModalOpen} setIsOpen={setNewItemModalOpen} onConfirm={addNewItem}>
            <TextInput value={newItemName} setValue={setNewItemName} label={"Item name"}/>
            <NumberInput value={newItemQuantity} setValue={setNewItemQuantity} label={"Quantity"} minValue={0} maxValue={9999}/>
        </Modal>
    </Card>
}