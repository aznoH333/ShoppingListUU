import {User} from "@/src/types/User";
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import styles from "./ListControls.module.css";
import {Card} from "@/src/modules/card/Card";
import {Button} from "@/src/modules/button/Button";
import {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";

interface ListControlsProps {
    loggedInUser: User,
    list: ShoppingList,
    updateList: (list: ShoppingList) => void
}

export function ListControls({loggedInUser, list, updateList}: ListControlsProps){

    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);


    if (!listUser) {
        return <div>
            TODO : no access
        </div>
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
                <Button onClick={()=>alert("delete")} disabled={listUser.role === "owner"}>
                    Leave
                </Button>
            </div>
        </div>

        <Modal
            isOpen={editModalOpen}
            onConfirm={()=>alert("a")}
            setIsOpen={setEditModalOpen}
        >
            test
        </Modal>
    </Card>


}