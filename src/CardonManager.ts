type CardonManagerSubscribeCallback = (componentList: React.ComponentType<any>[]) => void;
export class CardonManager {
    private static cardList: React.ComponentType<any>[] = [];
    private static cardonSubscribeList: CardonManagerSubscribeCallback[] = []
    private static notify() {
        for (let index = 0; index < this.cardonSubscribeList.length; index++) {
            const func = this.cardonSubscribeList[index];
            func(this.cardList);
        }
    }

    public static append(component: React.ComponentType<any>) {
        this.cardList.push(component);
        this.notify();
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