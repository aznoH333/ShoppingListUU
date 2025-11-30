import {User} from "@/src/types/User";
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import styles from "./ListControls.module.css";
import {Card} from "@/src/modules/card/Card";
import {Button} from "@/src/modules/input/button/Button";
import {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";
import {TextInput} from "@/src/modules/input/textInput/TextInput";
import {UserList, UserListButton} from "@/src/modules/user/userList/UserList";
import {useApplicationUsers} from "@/src/hooks/users/useApplicationUsers";
import {getUserRightsForAList} from "@/src/types/ShoppingListUser";
import {LoadingCard} from "@/src/modules/loadingCard/LoadingCard";

interface ListControlsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList | undefined) => void
}

export function ListControls({loggedInUser, list, updateList}: ListControlsProps){
    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const {data: users, loading, error} = useApplicationUsers();





    const userRights = getUserRightsForAList(listUser);
    const listUserIds = list.users.map((it)=>it.user._id);
    const possibleUsersToAdd = users.filter((it)=>!listUserIds.includes(it._id));

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [nameEdit, setNameEdit] = useState(list.name);

    const [userModalOpen, setUserModalOpen] = useState(false);




    const editList = ()=> {
        updateList({
            ...list,
            name: nameEdit,
        });
        setEditModalOpen(false);
    }

    const addUserToList = (pickedUserId: string) => {
        const userToAdd = users.find((it)=>it._id === pickedUserId);

        if (!userToAdd) {
            return;
        }

        const userMembershipId = Math.random().toString(); // UUID for poor people

        updateList({
            ...list,
            users: [...list.users, {
                _id: userMembershipId,
                role: "member",
                user: userToAdd
            } ]
        });

        setUserModalOpen(false);
    }

    const removeUserFromList = (userId: string) => {

        updateList({
            ...list,
            users: list.users.filter((it)=>it.user._id !== userId)
        });
    }

    // admin buttons
    const adminButtons: UserListButton | undefined =
        userRights.canRemoveUsers ? {
            label: "kick",
            function: removeUserFromList,
            dontShowForUsers: [listUser?._id ?? ""]
        } : undefined


    if (loading || error) {
        return <LoadingCard error={error} heightPx={224}/>
    }


    return <Card>
        <div className={styles.header}>
            <div className={styles.title}>

                <div className={styles.titleHint}>Shopping list</div>
                <div className={styles.titleName}>{list.name}</div>
            </div>

            <div className={styles.headerButtons}>
                <Button onClick={()=>setEditModalOpen(true)} disabled={!userRights.canEditList && list.state !== "archived"}>
                    Edit
                </Button>
                <Button onClick={()=>{removeUserFromList(loggedInUser._id)}} disabled={!userRights.canLeave}>
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
            <UserList users={list.users} buttons={adminButtons}/>

        </div>

        {userRights.canAddUsers && list.state !== "archived" && (
            <div className={styles.userButtonContainer}>
                <Button onClick={()=>{setUserModalOpen(true)}}>Add user</Button>
            </div>
        )
        }


    </Card>


}