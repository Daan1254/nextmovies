import { useState } from "react";

export default function Seat({onToggle}: any) {
    const [reserved, setReserved] = useState<boolean>(false);
    return(
        <div onClick={() => {onToggle(), setReserved(!reserved)}}
        className={`h-12 w-16 rounded-t-2xl hover:bg-blue-200
        ${reserved ? 'bg-blue-900 hover:bg-blue-900' : 'bg-gray-300'}
        transition-all duration-200`}></div>
    )
}