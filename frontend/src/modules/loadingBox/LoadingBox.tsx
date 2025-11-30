import styles from "./LoadingBox.module.css"
import {Card} from "@/src/modules/card/Card";

interface LoadingBoxProps {
    heightPx?: number,
    error?: string | undefined,
}

export function LoadingBox({error, heightPx = 200}: LoadingBoxProps) {
    if (!error) {

        return <div className={styles.cardContainer} style={{
            height: heightPx,
        }}>

            <span className={styles.loader}></span>

        </div>


    }



    return <div className={styles.cardContainer} style={{
            height: heightPx,
    }}>
        <div className={styles.error}>💀 Error</div>
    </div>




}