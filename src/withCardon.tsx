import React from "react";
import { CardonManager } from "./CardonManager";

export type WithCardonGet<T> = (data?: T) => VoidFunction
export interface WithCardonProps<R> {
    /**
     * Represents whether the card is visible or not.
     */
    visible: boolean

    /**
     * Represents the function that generates the callback functions. It can be returned by passing data into the parameter.
     */
    get: WithCardonGet<R>
}
export type WithCardonOptions = {
    /**
     * Enables destroy the component while hiding.
     * 
     * When you do not change this property, the component will not be removed from the root and you will need to hide it with the 'visible' property manually.
     * 
     * Default value is `'false'`
     */
    destroyOnHide?: boolean

    /**
     * The key of the component. You can close the component by calling the 'CardonContainer.remove(key)' method.
     */
    key?: string

}
type WithCardonOnShow = (resolve: (data: any) => void, props?: any) => void

interface WithCardonEnchantedState {
    props: {},
    resolve: (data: any) => void
}

export type WithCardonShow<P, R> = (props?: P, callback?: (result: R) => void) => Promise<R>
export type WithCardonResult<T, P> = {
    /**
     * Shows the card component. Card props can be passed optionally.
     */
    show: WithCardonShow<T, P>
    /**
     * Hides the card.
     * 
     * By default, it calls the 'get' method that is passed as props: `get(undefined)`. If you call it with a parameter, the promise resolves with that value.
     */
    hide: (rejectData: any) => void
}

export type CardonRef = {
    resolve: (value: any) => void,
    setVisible: (value: boolean) => void,
    key: string,
    component: () => JSX.Element | null
}
/**
 * Wraps the component you want to make reusable and returns the `'show'` and `'hide'` functions within an object.
 * 
 * @template P The type of props value
 * @template R The type of return value
 * @param component The component to show.
 * @param options Options
 * @returns  
 * ```
 * {
 *   show: (args?: P, callback?: (result: P) => void): Promise<R>,
 *   hide: () => void,
 * }
 * ```
 */
export function withCardon<P, R = {}>(component: React.ComponentType<P & WithCardonProps<R>>, options?: WithCardonOptions) {

    let onShow: WithCardonOnShow = () => { };
    const cardonKey = options?.key || Math.random().toString(36).substring(2);
    let cardonRef:CardonRef = {
        resolve: (value: any) => { },
        setVisible: (value: boolean) => { },
        key: cardonKey,
        component: () => null
    };
    function WithCardonEnchanted() {
        const [params, setParams] = React.useState<WithCardonEnchantedState>({ props: {}, resolve: (data: any) => { } });
        const [visible, setVisible] = React.useState(false);

        onShow = (resolve, params) => {
            setParams({ props: params || {}, resolve });
            setVisible(true);
            cardonRef.setVisible = setVisible;
        }

        const get: WithCardonGet<R> = (data?: R) => () => {
            params.resolve(data)
            setVisible(false);
        }

        const customProps: WithCardonProps<R> = {
            get,
            visible
        };

        if (options?.destroyOnHide && !visible) return null;
        const Component = component;
        return (
            <Component
                {...params.props as (WithCardonProps<R> & P)}
                {...customProps}
            >
            </Component>
        );
    }
    cardonRef.component = WithCardonEnchanted;
    CardonManager.append(cardonRef);
    const show: WithCardonShow<P, R> = (props?: P, callback?: (result: R) => void) => {
        const promise = new Promise<R>((resolve) => {
            onShow(resolve, props)
            cardonRef.resolve = resolve;
        });
        if (typeof callback === "function") {
            promise.then(callback);
        }
        return promise;
    };

    const hide = (rejectData: any) => {
        cardonRef.resolve(rejectData);
        cardonRef.resolve = (value: any) => { };

        cardonRef.setVisible(false);
        cardonRef.setVisible = (value: boolean) => { };
    };



    const result: WithCardonResult<P, R> = {
        show,
        hide
    }
    return result;
}