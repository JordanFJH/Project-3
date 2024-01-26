import allContent from "../../dummyData";
import { useEffect, useState } from "react";


function UserHomePage(props) {

    const [combinedMedia, setCombinedMedia] = useState([])

    let combined = []
    function showConsuming(content, index) {
        return (
            <h4 key={index}>{content.name}</h4>
        )
    }

    useEffect(() => {
        combined = [...allContent.bookData, ...allContent.gameData,...allContent.movieData,...allContent.tvData]
        setCombinedMedia(combined)
        console.log(combined)
    }, [])

    console.log(combinedMedia)
    let consuming = combinedMedia.filter((con) => con.consuming == true)
    let bookArray = combinedMedia.filter((con) => con.type === "book")


    return (
        <div className="user-home-main">
            <section className="h-full flex flex-col justify-around w-4/12 border-black border-2 border-solid">
                <div className="h-1/4 w-full border-black border-2 border-solid">
                    <h5 className="underline">Currently Consuming</h5>
                    {consuming.map(showConsuming)}
                </div>
                <div>
                    <h5>Media Snapshot</h5>
                    <h4>Books: {bookArray.length}</h4>
                </div>
                <div>
                    All my media
                </div>
            </section>
            <section>
                Trending
            </section>
            <section>
                Search
            </section>
        </div>
    );
}

export default UserHomePage;