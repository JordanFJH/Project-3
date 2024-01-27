import allContent from "../../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function UserHomePage(props) {
    

    // const token = localStorage.getItem("token")
    // console.log("token from UserHomePage", token)

    const [combinedMedia, setCombinedMedia] = useState([])

    let combined = []
    function showConsuming(content, index) {
        return (
            <h4 key={index}>{content.name}: {(content.progress / content.length).toFixed(2) * 100}% </h4>
        )
    }
    async function getUser(token) {
        try {
            const response = await axios.get("/api/users", {
                headers: {
                    Authorization: token
                }
            })
            console.log("response.data ", response.data)
            props.setUser(response.data)
        } catch (error) {
            console.log(error)
            localStorage.removeItem("token")
        }
        //setIsLoading(false);
    }

    useEffect(() => {
        combined = [...allContent.bookData, ...allContent.gameData, ...allContent.movieData, ...allContent.tvData]
        setCombinedMedia(combined)
        const token = localStorage.getItem("token")
        if (token) {
            // Get user info
            getUser(token)
        }
    }, [])

    console.log("props.user ", props.user)

    console.log(combinedMedia)

    return (
        <div className="user-home-main">
            <section className="h-full flex flex-col justify-around w-4/12 border-black border-2 border-solid">
                <div className="h-1/4 w-full border-black border-2 border-solid">
                    <h5 className="underline">Currently Consuming</h5>
                    {combinedMedia.filter((cont) => cont.consuming == true).map(showConsuming)}
                </div>
                <div>
                    <h5 className="underline">Media Snapshot</h5>
                    <h4>Books: {combinedMedia.filter((con) => con.type == "book").length}</h4>
                    <h4>TV Shows: {combinedMedia.filter((con) => con.type == "tv").length}</h4>
                    <h4>Movies: {combinedMedia.filter((con) => con.type == "movie").length}</h4>
                    <h4>Games: {combinedMedia.filter((con) => con.type == "game").length}</h4>

                </div>

                <div className="flex justify-center">
                    <Link to="/content">
                        <h2 className="hover-scale">
                            All my media
                        </h2>
                    </Link>
                </div>

            </section>
            <section className="h-full w-5/12 border-black border-2 border-solid flex flex-col items-center">
                <h2 className="underline">What's Trending</h2>
                <div className="border-black border-2 border-solid h-full w-full">
                    <h4>Sample Data</h4>
                </div>
            </section>
            <section className="flex items-center">
                <Link to="/search">
                    <div className="border-black border-2 border-solid w-full">
                        <h2>Search</h2>

                    </div>
                </Link>
            </section>
        </div>
    );
}

export default UserHomePage;