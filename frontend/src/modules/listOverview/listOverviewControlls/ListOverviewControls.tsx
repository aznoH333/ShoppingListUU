import {User} from "@/src/types/User";
import {Button} from "@/src/modules/input/button/Button";
import {Modal} from "@/src/modules/modal/Modal";
import React, {useState} from "react";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {EMPTY_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";
import {Dropdown} from "@/src/modules/input/dropdown/Dropdown";

interface ListOverviewControlsProps {
    loggedInUser: User,
    onListAdd: (list: ShoppingList)=>void,
    listFilter: "all" | "archived" | "active",
    setListFilter: (value: "all" | "archived" | "active")=>void
}

export function ListOverviewControls({loggedInUser, onListAdd, listFilter, setListFilter}: ListOverviewControlsProps) {
    const [addListModalOpen, setAddListModalOpen] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [newListId, setNewListId] = useState(3);




    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        <div style={{
            maxWidth: 200,
        }}>
            <Dropdown values={["all", "archived", "active"]} defaultValue={listFilter}
                      setValue={setListFilter as (value: string) => void}/>
        </div>
        <Button onClick={() => {
            setAddListModalOpen(true)
        }}>Add list</Button>

        <Modal isOpen={addListModalOpen} setIsOpen={setAddListModalOpen} onConfirm={
            () => {
                onListAdd({
                    ...EMPTY_SHOPPING_LIST,
                    name: newListName,
                    id: newListId,
                })
                setAddListModalOpen(false);
                setNewListId(newListId + 1);
            }}
        >
            <TextInput value={newListName} setValue={setNewListName} label={"List name"}/>
        </Modal>
    </div>
}