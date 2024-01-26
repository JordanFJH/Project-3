import allContent from "../../dummyData";
import ContentCard from "../components/ContentCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function UserMediaPage(props) {
    
    const [combinedMedia, setCombinedMedia] = useState([])
    useEffect(() => {
        let combined = [...allContent.bookData, ...allContent.gameData, ...allContent.movieData, ...allContent.tvData]
        setCombinedMedia(combined)
        console.log(combined)
    }, [])

    // console.log("UserMedia Page:" + state)
    return (
        <div className="user-media-main">
            <section className="border-solid border-black border-2 w-2/5 flex flex-col items-center underline">
                <h2>Your Current Media</h2>
                {combinedMedia.map((content, index) => <ContentCard content={content} index={index}/>)}
            </section>
            <section className="border-solid border-black border-2 w-2/5">
                Individual media
            </section>
        </div>
    );
}

export default UserMediaPage;