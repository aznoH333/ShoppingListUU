


import styles from "./ListItems.module.css";
import {ShoppingList} from "@/src/types/ShoppingList";
import {Card} from "@/src/modules/card/Card";
import {ShoppingItemList} from "@/src/modules/list/shoppinItemList/ShoppingItemList";
import {Button} from "@/src/modules/input/button/Button";
import React, {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {NumberInput} from "@/src/modules/input/numberInput/NumberInput";


interface ListItemsProps {
    list: ShoppingList,
}

export function ListItems({list}: ListItemsProps) {
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(1);

    return <Card>
        <div className={styles.title}>
            Items
        </div>

        <div className={styles.itemContainer}>
            <ShoppingItemList items={list.items} checkButtonClicked={()=>{}}/>
        </div>

        <div className={styles.buttonContainer}>
            <Button onClick={()=>{setNewItemModalOpen(true)}}>Add new item</Button>
        </div>

        <Modal isOpen={newItemModalOpen} setIsOpen={setNewItemModalOpen} onConfirm={()=>{alert("todo")}}>
            <TextInput value={newItemName} setValue={setNewItemName} label={"Item name"}/>
            <NumberInput value={newItemQuantity} setValue={setNewItemQuantity} label={"Quantity"}/>
        </Modal>
    </Card>
}