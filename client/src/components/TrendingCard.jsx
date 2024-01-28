import { useState } from "react";
import { getOneTrend } from "../functions/userMediaFunctions";


function TrendingCard({ con, setShowTrend, setSpecificTrend }) {

    async function handleClick() {
        setShowTrend(true)
        getOneTrend(con, setSpecificTrend)
    }

    return (
        <div onClick={handleClick} className="flex flex-col items-center border-solid border-black border-2">
            <h2 className="mb-0">{con?.name}</h2>
            <h3 className="mt-0 text-green-800">{con?.type}</h3>
        </div>
    );
}

export default TrendingCard;