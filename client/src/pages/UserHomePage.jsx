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

    function showConsuming(content, index) {
        return (
            <h4 key={index}>{content.name}: {(content.progress / content.length).toFixed(2) * 100}% </h4>
        )
    }
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
            <section className="h-full flex flex-col justify-around w-2/12 border-black border-2 border-solid">
                <Link to="/search">
                    <div className="w-full">
                        <h2>Search</h2>
                    </div>
                </Link>
                <div className="h-1/4 w-full border-black border-2 border-solid">
                    <h5 className="underline">Currently Consuming</h5>
                    {props.user.username ?
                        choppedMedia.filter((cont) => cont.consuming == true).map(showConsuming) : "Loading"
                    }
                </div>
                <div>
                    <h5 className="underline">Media Snapshot</h5>
                    {props.user.username ? <>
                        <h4>Books: {choppedMedia.filter((con) => con.type == "book").length}</h4>
                        <h4>TV Shows: {choppedMedia.filter((con) => con.type == "tv").length}</h4>
                        <h4>Movies: {choppedMedia.filter((con) => con.type == "movie").length}</h4>
                        <h4>Games: {choppedMedia.filter((con) => con.type == "game").length}</h4>
                    </> : "Loading"
                    }
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
                <h5 className="m-0">(Click for more info)</h5>
                <div className="border-black border-2 border-solid h-full w-full overflow-scroll">
                    {trendingContent.map((con, index) => <TrendingCard
                        con={con}
                        key={index}
                        setShowTrend={setShowTrend}
                        setSpecificTrend={setSpecificTrend}
                    />)}
                </div>
            </section>
            {showTrend &&
                <section className="flex items-center w-3/12 h-full flex flex-col overflow-scroll">
                    <button onClick={() => setShowTrend(false)} className="">X</button>
                    <div className="w-full">
                        <img src={specificTrend.imgURL} alt="Poster Picture" className="w-full h-full" />
                    </div>
                    <h2 className="underline">{specificTrend.name}</h2>
                    <h3>Type: {specificTrend.type}</h3>
                    <h3>Runtime: {specificTrend.length}</h3>
                    <h3 className="underline mb-0">Overview</h3>
                    <h3>{specificTrend.desc}</h3>
                    <button onClick={addMedia}>Add Media</button>
                </section>
            }
        </div>
    );
}

export default UserHomePage;