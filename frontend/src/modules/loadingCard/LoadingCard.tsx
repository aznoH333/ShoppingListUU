import styles from "./LoadingCard.module.css"
import {Card} from "@/src/modules/card/Card";

interface LoadingCardProps {
    heightPx?: number,
    error?: string | undefined,
}

export function LoadingCard({error, heightPx = 200}: LoadingCardProps) {
    if (!error) {
        return <Card>
            <div className={styles.cardContainer} style={{
                height: heightPx,
            }}>

                <span className={styles.loader}></span>

            </div>

        </Card>
    }



    return <Card>
        <div className={styles.cardContainer} style={{
            height: heightPx,
        }}>
            <div className={styles.error}>💀 Error</div>
            <div className={styles.text}>{error}</div>

        </div>

    </Card>



}