import Cardon, { withCardon, WithCardonProps } from "cardon";
import React from "react";



interface AlertCardProps {
    id: number
    name?: string
}
function AlertCard({ visible, get, name, id }: AlertCardProps & WithCardonProps<boolean>) {

    
    const clickCustomAlertCard1Hide = async () => { 
        Cardon.hide("alert-card-key");
    }
    const clickCustomAlertCard1HideAlt = async () => { 
        Cardon.clear();
    }
    return (
        <div style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            alignContent: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "rgba(0.2, 0.2, 0.2, 0.2)"
        }}>
            <div style={{
                background: "rgb(255 207 207)",
                color: "black",
                borderColor: "red",
                borderStyle: "solid",
            }}>
                Request ID:{id}
                <br />
                Are you sure '{name}'?
                <br />
                <button onClick={get(true)}>Yes</button>
                <button onClick={get(false)}>No</button>

                <br/>
                
            <button onClick={clickCustomAlertCard1Hide}>
                Open Custom Alert Hide
            </button>
            <button onClick={clickCustomAlertCard1HideAlt}>
                Open Custom Alert Hide Alternative
            </button>
            </div>
        </div>
    )
}
export default withCardon(AlertCard, { destroyOnHide: true, key: "alert-card-key" })



