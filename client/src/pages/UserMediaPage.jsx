import allContent from "../../dummyData";
import ContentCard from "../components/ContentCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function UserMediaPage(props) {

    const [combinedMedia, setCombinedMedia] = useState([])
    const [filterType, setFilterType] = useState("all")
    const [displayInfo, setDisplayInfo] = useState(false)
    const [activeInfo, setActiveInfo] = useState({})
    // const [filteredMedia, setFilteredMedia] = useState([])
    useEffect(() => {
        let combined = [...allContent.bookData, ...allContent.gameData, ...allContent.movieData, ...allContent.tvData]
        setCombinedMedia(combined)
        console.log(combined)
    }, [])

    // Filtering display
    let filteredMedia = combinedMedia.filter((item) => {
        switch (filterType) {
            case "all":
                return true
            case "movie":
                if (item.type == "movie") {
                    return true
                }
                break;
            case "tv":
                if (item.type == "tv") {
                    return true
                }
                break;
            case "game":
                if (item.type == "game") {
                    return true
                }
                break;
            case "book":
                if (item.type == "book") {
                    return true
                }
                break;
            default:
                break;
        }
    })

    // console.log("UserMedia Page:" + state)
    return (
        <div className="user-media-main">
            <section className="border-solid border-black border-2 w-2/5 flex flex-col items-center">
                <h2 className="underline">Your Current Media</h2>
                <div className="flex w-full justify-around">
                    <button onClick={() => setFilterType("all")}>All</button>
                    <button onClick={() => setFilterType("movie")}>Movie</button>
                    <button onClick={() => setFilterType("tv")}>Television</button>
                    <button onClick={() => setFilterType("game")}>Game</button>
                    <button onClick={() => setFilterType("book")}>Book</button>
                </div>
                <section className="w-full flex flex-col overflow-scroll">
                    {filteredMedia.map((content, index) => <ContentCard 
                    content={content} 
                    key={index} 
                    displayInfo = {displayInfo}
                    setDisplayInfo = {setDisplayInfo}
                    setActiveInfo = {setActiveInfo}
                    />)}
                </section>
            </section>
            {displayInfo &&
            <section className="border-solid border-black border-2 w-2/5">
                <h3>{activeInfo.name}</h3>
                <h4>{activeInfo.type}</h4>
                <h4>{activeInfo.progress}</h4>
                <h4>{activeInfo.length} {activeInfo.lengthType}</h4>
            </section>
}
        </div>
    );
}

export default UserMediaPage;