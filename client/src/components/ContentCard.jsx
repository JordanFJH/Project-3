import { useState } from "react";

function ContentCard({ content, setActiveInfo, setDisplayInfo, displayInfo }) {

    let lengthType = "";

    function setLengthType() {
        switch (content.type) {
            case "movie":
                lengthType = "minutes"
                break;
            case "tv":
                lengthType = "episodes"
                break;
            case "game":
                lengthType = "hours"
                break;
            case "book":
                lengthType = "pages"
                break;
            default:
                break;
        }
    }

    setLengthType()

    function setItUp() {
        content.lengthType = lengthType
        setDisplayInfo(true)
        setActiveInfo(content)

    }

    return (
        <div className="card-display" onClick={setItUp}>
            <h3>{content.name}</h3>
            <h4>{content.type}</h4>
            <h4>{content.completed ? "Completed" : "Incomplete"}</h4>
        </div>
    );
}

export default ContentCard;