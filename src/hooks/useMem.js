import { useState } from "react";


const useMem = () => {
    const [mem, setMem] = useState("");

    const addToMem = (arg) => {
        setMem(arg);
    }

    return [mem, addToMem]
}

export default useMem;