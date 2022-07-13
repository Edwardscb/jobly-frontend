import { useState, useEffect } from "react";

const useLocalStorage = (key, val = null) => {
    const initialVal = localStorage.getItem(key) || val;

    const [item, setItem] = useState(initialVal);

    useEffect(() => {

        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;
