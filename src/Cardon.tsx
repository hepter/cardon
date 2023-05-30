import { CardonManager } from "./CardonManager";

export class Cardon {
    /**
     * Hide all cardon components
     */
    public static clear() {
        CardonManager.clear();
    }

    /**
     * Hide only the cardon component with the given key
     */
    public static hide(key: string) {
        CardonManager.hide(key);
    }
}