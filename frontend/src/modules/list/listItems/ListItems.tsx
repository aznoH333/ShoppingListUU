


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


interface ListItemsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void,
}

export function ListItems({loggedInUser, list, updateList}: ListItemsProps) {

    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const userRights = getUserRightsForAList(listUser);


    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(1);


    const addNewItem = () => {
        // TODO : this is placeholder logic. this will eventually be implemented on the backend
        // why is business logic being implemented on the frontend a requirement?
        // who knows? if it where up to me i would just put a console.debug("TODO implement api call")
        // or something like that here.
        // teaching ppl to implement business logic client side just leads to bad habits and security vulnerabilities

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


    return <Card>
        <div className={styles.title}>
            Items
        </div>

        <div className={styles.itemContainer}>
            <ShoppingItemList items={list.items} checkButtonClicked={toggleItemState}/>
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