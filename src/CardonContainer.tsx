import React, { ReactElement, useEffect } from 'react'
import { CardonManager } from "./CardonManager";
import { CardonRef } from './withCardon';

export function CardonContainer(): ReactElement<any> {
    const [refList, setRefList] = React.useState<CardonRef[]>([]);
    useEffect(() => {

        const cardListChangedCallback = (refList: CardonRef[]) => {
            setRefList([...refList]);
        }

        return CardonManager.subscribe(cardListChangedCallback);
    }, [])

    return <>
        {refList.map((ref) => {
            const Comp = ref.component;
            return <Comp key={"CardonContainer_" + ref.key} />
        })}
    </>
}
