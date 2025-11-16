"use client"
import styles from "./ListCard.module.css"
import {ShoppingList, shoppingListGetUserAsListUser} from "@/src/types/ShoppingList";
import {User} from "@/src/types/User";
import {getUserRightsForAList} from "@/src/types/ShoppingListUser";
import {Button} from "@/src/modules/input/button/Button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Modal} from "@/src/modules/modal/Modal";

interface ListCardProps {
    list: ShoppingList,
    loggedInUser: User,
    onListDelete: (listId: number)=>void;
    onListArchive: (listId: number)=>void;
}

export function ListCard({list, loggedInUser, onListDelete, onListArchive}: ListCardProps) {
    const listUser = shoppingListGetUserAsListUser(loggedInUser, list);
    const userRights = getUserRightsForAList(listUser);

    const router = useRouter();

    const [archiveModalOpen, setArchiveModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    const completedCount = list.items.filter((it)=>it.state == "checked").length


    return <div className={styles.card}>
        <div className={styles.cardRow}>
            <div className={list.state === "active" ? styles.title : styles.archived}>{list.name} {list.state === "archived" && <>(Archived)</>}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Completed {completedCount}/{list.items.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.completed}>Members {list.users.length}</div>
        </div>
        <div className={styles.cardRow}>
            <div className={styles.buttons}>
                {userRights.canArchiveList && list.state !== "archived" && (
                    <Button onClick={() => {
                        setArchiveModalOpen(true);
                    }}>Archive</Button>
                )}

                {userRights.canDeleteList && list.state !== "archived"  && (
                    <Button onClick={() => {
                        setDeleteModalOpen(true)
                    }}>Delete</Button>
                )}

            </div>
            <div className={styles.buttons}>
                <Button onClick={() => {
                    router.push("/list/" + list.id)
                }}>View</Button>


            </div>
        </div>

        <Modal isOpen={archiveModalOpen} setIsOpen={setArchiveModalOpen} onConfirm={()=>
            {
                onListArchive(list.id);
                setArchiveModalOpen(false);
            }
        }>
            Are you sure you want to archive {list.name}?
        </Modal>

        <Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onConfirm={()=>
        {
            onListDelete(list.id);
            setDeleteModalOpen(false);
        }
        }>
            Are you sure you want to delete {list.name}?
        </Modal>
    </div>
}