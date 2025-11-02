
import styles from "./page.module.css";

export default function Home() {
  return (
    <div
    style={{
        display: "flex",
        flexDirection: "column"
    }}
    >

        <div>TODO : home page</div>
        <a href={"/list/0"} className={styles.link}>open debug list as owner</a>
        <a href={"/list/1"} className={styles.link}>open debug list 2 as member</a>


        <p>
            Note : when a member leaves a list, their role changes from "member" to "visitor".
            visitors can't interact with a list. this role exists just to demonstrate
            that the leave functionality is implemented.
        </p>
        <p>
            Note 2 : owners can't leave their own list. they can only delete/archive it.
            Deleting/archiving lists is yet to be implemented
        </p>
    </div>
  );
}
