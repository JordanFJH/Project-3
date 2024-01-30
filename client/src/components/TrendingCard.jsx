import { useState } from "react";
import { getOneTrend } from "../functions/userMediaFunctions";


function TrendingCard({ con, setShowTrend, setSpecificTrend }) {

    async function handleClick() {
        setShowTrend(true)
        getOneTrend(con, setSpecificTrend)
    }

    return (
        <div onClick={handleClick} className="flex border-solid border-black border-2 h-64">
            <div className="h-full w-1/2">
                <img src={con.imgURL} alt="Show or movie Picture" className="h-full w-full" />
            </div>
            <div className="flex flex-col items-center w-1/2 justify-center">
                <h1 className="mb-0">{con?.name}</h1>
                <h3 className="mt-0 text-green-800">{con?.type}</h3>
            </div>

        </div>
    );
}

export default TrendingCard;