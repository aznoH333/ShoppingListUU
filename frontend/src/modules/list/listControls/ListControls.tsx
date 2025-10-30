import {User} from "@/src/types/User";
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import styles from "./ListControls.module.css";
import {Card} from "@/src/modules/card/Card";
import {Button} from "@/src/modules/input/button/Button";
import {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {NumberInput} from "@/src/modules/input/numberInput/NumberInput";
import {UserList} from "@/src/modules/user/userList/UserList";

interface ListControlsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void
}

export function ListControls({loggedInUser, list, updateList}: ListControlsProps){

    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [nameEdit, setNameEdit] = useState(list.name);

    if (!listUser) {
        return <div>
            TODO : no access
        </div>
    }

    const isUserOwner = listUser.role === "owner";

    return <Card>
        <div className={styles.header}>
            <div className={styles.title}>

                <div className={styles.titleHint}>Shopping list</div>
                <div className={styles.titleName}>{list.name}</div>
            </div>

            <div className={styles.headerButtons}>
                <Button onClick={()=>setEditModalOpen(true)} disabled={listUser.role !== "owner"}>
                    Edit
                </Button>
                <Button onClick={()=>alert("todo : leave")} disabled={listUser.role === "owner"}>
                    Leave
                </Button>
            </div>
        </div>

        <Modal
            isOpen={editModalOpen}
            onConfirm={()=>{
                updateList({
                    ...list,
                    name: nameEdit,
                })
            }}
            setIsOpen={setEditModalOpen}
        >
            <TextInput value={nameEdit} setValue={setNameEdit} label={"list name"}/>

        </Modal>



        <div className={styles.userHeader}>
            Members
        </div>
        <div className={styles.userList}>
            <UserList users={list.users}/>

        </div>

        {isUserOwner && (
            <div className={styles.userButtonContainer}>
                <Button onClick={()=>{alert("TODO this")}}>Add user</Button>
            </div>
        )
        }


    </Card>


}