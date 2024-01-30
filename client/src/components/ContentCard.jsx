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
            <div className="w-full h-1/2">
                <img src={content.imgURL} alt="Picture Not Found" className="w-full h-full"/>
            </div>
            <h3 className="mb-0">{content.name}</h3>
            <h4 className="mt-0">{content.type}</h4>
            <h2>{((content.progress / content.length) * 100).toFixed(2)} % complete</h2>
        </div>
    );
}

export default ContentCard;