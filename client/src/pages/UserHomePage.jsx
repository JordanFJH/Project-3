import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrendingContent } from "../functions/userMediaFunctions";
import TrendingCard from "../components/TrendingCard";


function UserHomePage(props) {


    // const token = localStorage.getItem("token")
    // console.log("token from UserHomePage", token)

    let [combinedMedia, setCombinedMedia] = useState([])
    let [trendingContent, setTrendingContent] = useState([])
    let [specificTrend, setSpecificTrend] = useState({})
    let [showTrend, setShowTrend] = useState(false)
    let choppedMedia = combinedMedia
    let exists = false

    function showConsuming(content, index) {
        return (
            <h4 key={index}>{content.name}: {(content.progress / content.length).toFixed(2) * 100}% </h4>
        )
    }

    function checkLibrary() {
        for (const item of combinedMedia) {
            if (specificTrend.type == item.type && specificTrend.id == item.id) {
                console.log("Item exists in library")
                exists = true;
            }
        }
    }

    checkLibrary()
    async function getUser(token) { //Getting user info and data
        try {
            // Setting the user
            const response = await axios.get("/api/users", {
                headers: {
                    Authorization: token
                }
            })
            console.log("response.data ", response.data)
            props.setUser(response.data)
            console.log("user set")
            // Setting the user's data
            const data = await axios.get("/content", {
                headers: {
                    Username: props.user.username
                }
            })
            console.log(data.data)
            setCombinedMedia(data.data)
        } catch (error) {
            console.log(error)
            localStorage.removeItem("token")
        }
        //setIsLoading(false);
    }

    // Add media to collections function
    async function addMedia() {
        try {
            let singleObj = {
                name: specificTrend.name,
                type: specificTrend.type,
                length: specificTrend.length,
                desc: specificTrend.desc,
                imgURL: specificTrend.imgURL,
                infoLink: specificTrend.infoLink,
                id: specificTrend.id
            }
            await axios.post("/content", singleObj, {
                headers: {
                    Username: props.user.username
                }
            })

            const data = await axios.get("/content", { // get user collection again
                headers: {
                    Username: props.user?.username
                }
            })
            console.log("From the addmedia ", data.data)
            setCombinedMedia(data.data)
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            // Get user info
            getUser(token)
        }
        getTrendingContent(setTrendingContent)
    }, [])

    choppedMedia = [...combinedMedia]
    return (
        <div className="user-home-main">
            <section className="h-full flex flex-col w-2/12 border-black border-2 border-solid bg-purple-300 mr-28">
                <Link to="/search">
                    <div className="w-full text-center">
                        <h2 className="underline">Search Content</h2>
                        <hr className="border-black border-solid border-2" />
                    </div>
                </Link>
                <div className="h-1/4 w-full overflow-y-scroll text-center">
                    <h3 className="underline">Currently Consuming</h3>
                    {choppedMedia.filter((cont) => cont.consuming == true).length > 0 ?
                        choppedMedia.filter((cont) => cont.consuming == true).map(showConsuming)
                        :
                        <div className="text-center">
                            <h3 className="m-0">**Consuming no media**</h3>
                            <h4 className="m-0">*Add content then go to library to start consuming*</h4>
                            <div className="w-full h-1/4">
                                <img src="/img/dead_pacman.gif" alt="picture of pac" className="w-1/2 h-1/4"/>
                            </div>
                        </div>
                    }
                    <hr className="border-black border-solid border-2" />
                </div>

                <div className="text-center">
                    <h3 className="underline">Media Snapshot</h3>
                    {props.user.username ? <div className="grid grid-cols-2 grid-rows-2 gap-2">
                        <div className="border-black border-solid border-2 rounded">
                            <h3 className="underline mb-0">Books</h3>
                            <h3 className="mt-2">{choppedMedia.filter((con) => con.type == "book").length}</h3>
                        </div>
                        <div className="border-black border-solid border-2 rounded">
                            <h3 className="underline mb-0">TV Shows</h3>
                            <h3 className="mt-2">{choppedMedia.filter((con) => con.type == "tv").length}</h3>
                        </div>
                        <div className="border-black border-solid border-2 rounded">
                            <h3 className="underline mb-0">Movies</h3>
                            <h3 className="mt-2">{choppedMedia.filter((con) => con.type == "movie").length}</h3>
                        </div>
                        <div className="border-black border-solid border-2 rounded">
                            <h3 className="underline mb-0">Games</h3>
                            <h3 className="mt-2">{choppedMedia.filter((con) => con.type == "game").length}</h3>
                        </div>
                    </div> : "Loading"
                    }
                    <hr className="border-black border-solid border-2" />
                </div>

                <div className="flex justify-center">
                    <Link to="/content">
                        <h2 className="hover-scale">
                            All my media
                        </h2>
                    </Link>
                </div>

            </section>
            <section className="h-full w-5/12 border-black border-2 border-solid flex flex-col items-center bg-purple-300 mr-10">
                <h2 className="underline">What's Trending</h2>
                <h5 className="m-0">(Click for more info)</h5>
                <div className="border-black border-2 border-solid h-full w-full overflow-y-scroll">
                    {trendingContent.map((con, index) => <TrendingCard
                        con={con}
                        key={index}
                        setShowTrend={setShowTrend}
                        setSpecificTrend={setSpecificTrend}
                    />)}
                </div>
            </section>
            {showTrend &&
                <section className="flex items-center w-3/12 h-full flex flex-col overflow-y-scroll bg-purple-300 border-black border-solid border-2">
                    <div className="w-full">
                        <img src={specificTrend.imgURL} alt="Poster Picture" className="w-full h-full" />
                    </div>
                    <h2 className="underline">{specificTrend.name}</h2>
                    <h3>Type: {specificTrend.type}</h3>
                    <h3>Runtime: {specificTrend.length} minutes</h3>
                    <a href={specificTrend.infoLink} target="_blank" rel="noopener noreferrer">Click for more info</a>
                    <h3 className="underline mb-0">Overview</h3>
                    <h3>{specificTrend.desc}</h3>
                    <button onClick={() => setShowTrend(false)} className="">Close</button>
                    <br /><br />
                    {exists == true ? <h2>Ready to Consume in Your Library</h2> : <button onClick={addMedia}>Add Content to Library</button>}
                </section>
            }
        </div>
    );
}

export default UserHomePage;