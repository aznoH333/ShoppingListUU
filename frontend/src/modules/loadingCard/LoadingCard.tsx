import {Card} from "@/src/modules/card/Card";
import {LoadingBox} from "@/src/modules/loadingBox/LoadingBox";

interface LoadingCardProps {
    heightPx?: number,
    error?: string | undefined,
}

export function LoadingCard({error, heightPx = 200}: LoadingCardProps) {



    return <Card>
        <LoadingBox error={error} heightPx={heightPx}/>
    </Card>



}