import {User} from "@/src/types/User";
import {Button} from "@/src/modules/input/button/Button";
import {Modal} from "@/src/modules/modal/Modal";
import {useState} from "react";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {EMPTY_SHOPPING_LIST, ShoppingList} from "@/src/types/ShoppingList";

interface ListOverviewControlsProps {
    loggedInUser: User,
    onListAdd: (list: ShoppingList)=>void
}

export function ListOverviewControls({loggedInUser, onListAdd}: ListOverviewControlsProps) {
    const [addListModalOpen, setAddListModalOpen] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [newListId, setNewListId] = useState(3);

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <Button onClick={()=>{setAddListModalOpen(true)}}>Add list</Button>

        <Modal isOpen={addListModalOpen} setIsOpen={setAddListModalOpen} onConfirm={
            ()=>{
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