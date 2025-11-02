import {User} from "@/src/types/User";
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import styles from "./ListControls.module.css";
import {Card} from "@/src/modules/card/Card";
import {Button} from "@/src/modules/input/button/Button";
import {use, useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {NumberInput} from "@/src/modules/input/numberInput/NumberInput";
import {UserList} from "@/src/modules/user/userList/UserList";
import {useApplicationUsers} from "@/src/hooks/users/useApplicationUsers";

interface ListControlsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void
}

export function ListControls({loggedInUser, list, updateList}: ListControlsProps){

    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const users = useApplicationUsers().get();

    const listUserIds = list.users.map((it)=>it.user.id);
    const possibleUsersToAdd = users.filter((it)=>!listUserIds.includes(it.id));
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [nameEdit, setNameEdit] = useState(list.name);

    const [userModalOpen, setUserModalOpen] = useState(false);

    if (!listUser) {
        return <div>
            TODO : no access
        </div>
    }

    const isUserOwner = listUser.role === "owner";

    const editList = ()=> {
        updateList({
            ...list,
            name: nameEdit,
        });
        setEditModalOpen(false);
    }

    const addUserToList = (pickedUserId: number) => {
        const userToAdd = users.find((it)=>it.id === pickedUserId);

        if (!userToAdd) {
            return;
        }

        const userMembershipId = list.users.length > 0 ? list.users
                .map((it)=>it.id)
                .reduce((it,acc)=>Math.max(it, acc)) + 1 :
            0;

        updateList({
            ...list,
            users: [...list.users, {
                id: userMembershipId,
                role: "member",
                user: userToAdd
            } ]
        });

        setUserModalOpen(false);
    }

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
            onConfirm={editList}
            setIsOpen={setEditModalOpen}
        >
            <TextInput value={nameEdit} setValue={setNameEdit} label={"list name"}/>
        </Modal>

        <Modal isOpen={userModalOpen} setIsOpen={setUserModalOpen}>
            <UserList users={possibleUsersToAdd} buttons={{
                label: "Add",
                function: addUserToList,
            }}/>
        </Modal>


        <div className={styles.userHeader}>
            Members
        </div>
        <div className={styles.userList}>
            <UserList users={list.users}/>

        </div>

        {isUserOwner && (
            <div className={styles.userButtonContainer}>
                <Button onClick={()=>{setUserModalOpen(true)}}>Add user</Button>
            </div>
        )
        }


    </Card>


}