import React from 'react'
import { ReactElement, useEffect } from 'react'
import { CardonManager } from "./CardonManager";

export function CardonContainer(): ReactElement<any> {
    const [cardList, setCardList] = React.useState<React.ComponentType<any>[]>([]);
    useEffect(() => {

        const cardListChangedCallback = (componentList: React.ComponentType<any>[]) => {
            setCardList(componentList);
        }

        return CardonManager.subscribe(cardListChangedCallback);
    }, [])
    return (
        <>
            {cardList.map((Comp, index) => <Comp key={"CardonContainer_" + index} />)}
        </>
    )
}
