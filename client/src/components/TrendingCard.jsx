import { useState } from "react";



function TrendingCard({ con }) {
    return (
        <div className="">
            <h2 className="mb-0">{con?.name}</h2>
            <h3 className="mt-0">{con?.type}</h3>
        </div>
    );
}

export default TrendingCard;