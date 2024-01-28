import { useState } from "react";

function ContentCard({ content, setActiveInfo, setDisplayInfo, setStartUpdate }) {

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
                lengthType = "hours (average)"
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
        setStartUpdate(false)
        content.lengthType = lengthType
        setDisplayInfo(true)
        setActiveInfo(content)

    }

    return (
        <div className="card-display" onClick={setItUp}>
            <div className="w-full text-center">
                <img src={content.imgURL} alt="Picture Not Found" className="w-2/4"/>
            </div>
            <h3 className="mb-0">{content.name}</h3>
            <h4>{content.type}</h4>
            <h4>{content.completed ? "Completed" : "Incomplete"}</h4>
        </div>
    );
}

export default ContentCard;