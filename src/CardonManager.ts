import { CardonRef } from "./withCardon";

type CardonManagerSubscribeCallback = (refList: CardonRef[]) => void;
export class CardonManager {
    private static refList: CardonRef[] = [];
    private static cardonSubscribeList: CardonManagerSubscribeCallback[] = []
    private static notify() {
        for (const func of this.cardonSubscribeList) {
            func(this.refList);
        }
    }
    public static append(cardonRef: CardonRef) {
        this.refList.push(cardonRef);
        this.notify();
    }

    public static clear() {
        for (const itemRef of this.refList) {
            itemRef.resolve(undefined);
            itemRef.resolve = () => { };
            itemRef.setVisible(false);
            itemRef.setVisible = () => { };
        }
    }

    public static hide(key: string) {
        const cardonRef = this.refList.find(cardonRef => cardonRef.key == key);
        if (cardonRef) {
            cardonRef.resolve(undefined);
            cardonRef.resolve = () => { };
            cardonRef.setVisible(false);
            cardonRef.setVisible = () => { };
        }
    }

    public static subscribe(func: CardonManagerSubscribeCallback) {
        this.cardonSubscribeList.push(func);
        this.notify();
        const unsubscribe = () => {
            this.cardonSubscribeList = this.cardonSubscribeList.filter(func => func != unsubscribe);
        }
        return unsubscribe;
    }

}