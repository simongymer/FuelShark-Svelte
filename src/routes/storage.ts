import { browser } from "$app/environment";

export function getItemFromLocalStorage<T>(itemKey: string, defaultValue: T): T {
    if (browser) 
    {
        let itemValue: T;
        const item = localStorage.getItem(itemKey);

        try {
            itemValue = item && JSON.parse(item);
        }
        catch {
            itemValue = <T>item; // Just return as a string.
        }

        if (itemValue == null) {
            return defaultValue;
        }
        return itemValue;
    }
    return defaultValue;
}

export function setItemInLocalStorage<T>(itemKey: string, newValue: T): void {
    if (browser) {
        if (typeof newValue === "string")
            localStorage.setItem(itemKey, newValue);
        else
            localStorage.setItem(itemKey, JSON.stringify(newValue));
    }
}

export function clearItemFromLocalStorage(itemKey: string): void {
    if (browser) {
        localStorage.removeItem(itemKey);
    }
}