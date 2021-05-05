import React from "react";

import AlertCard from "./cardon/AlertCard";
import ModalCard from "./cardon/ModalCard";

export default function Main() {
    const [result, setResult] = React.useState();


    const clickMaterialModalCard = () => {
        ModalCard.show({ title: "Modal Title" });
    }

    const clickCustomAlertCard = async () => {
        let result = await AlertCard.show({ id: 1, name: "Lorem Ipsum" });
        console.log("AlertCard Result is:", result);
        setResult(result);
    }
    return (
        <div>
            <button onClick={clickMaterialModalCard}>
                Open Material-UI modal
            </button>
            <br />
            <button onClick={clickCustomAlertCard}>
                Open Custom Alert
            </button>
            <br />
            Custom Alert Card result is: {result == null ? "empty" : result ? "Yes" : "No"}
        </div>
    )
}
