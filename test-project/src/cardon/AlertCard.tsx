import { withCardon, WithCardonProps } from "cardon";
import React from "react";



interface AlertCardProps {
    id: number
    name?: string
}
function AlertCard({ visible, get, name, id }: AlertCardProps & WithCardonProps<boolean>) {

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
            </div>
        </div>
    )
}
export default withCardon(AlertCard, { destroyOnHide: true })



