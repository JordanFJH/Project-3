import { useEffect, useState } from "react";
import { getGameInfo, getBookInfo, getMovieInfo, getTvInfo } from "../functions/specificSearch";



function SearchCard({ con, setSelectedSearch }) {

    let [imgLink, setImgLink] = useState("")

    function handleImgError() {
        if (con.imgURL) {
            setImgLink(con.imgURL)
        } else {
            setImgLink("public/img/no_picture.jpg")
        }
    }


    // Handles if image is not found on content
    function handleError(e) {
        console.log("Image error")
        console.log(e)
        e.target.onerror = null;
        e.target.src = "/img/no_picture.jpg"
    }

    useEffect(() => {
        handleImgError()
    }, [])

    function handleClick() {
        switch (con.type) {
            case "movie":
                getMovieInfo(con, setSelectedSearch)
                break;

            case "tv":
                getTvInfo(con, setSelectedSearch)
                break;

            case "book":
                getBookInfo(con, setSelectedSearch)
                break;

            case "game":
                getGameInfo(con, setSelectedSearch)
                break;

            default:
                console.log("Content type not found")
                break;
        }
    }

    return (
        <div className='border-green-800 border-solid border-2 w-3/12 h-72 hover:bg-green-900 m-4 bg-white' onClick={handleClick}>
            <div className='w-full h-1/2'>
                <img src={imgLink} alt="No picture found" className='w-full h-full' onError={(e) => handleError(e)} />
            </div>
            <div className="text-center">
                <h2>{con.name}</h2>
                {con.author && <h2>Author: {con.author}</h2>}
            </div>
        </div>
    );
}

export default SearchCard;