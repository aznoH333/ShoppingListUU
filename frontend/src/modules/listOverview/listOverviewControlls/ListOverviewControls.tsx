import {User} from "@/src/types/User";
import {Button} from "@/src/modules/input/button/Button";

interface ListOverviewControlsProps {
    loggedInUser: User,

}

export function ListOverviewControls({loggedInUser}: ListOverviewControlsProps) {
    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <Button onClick={()=>{alert("TODO")}}>Add list</Button>
    </div>
}