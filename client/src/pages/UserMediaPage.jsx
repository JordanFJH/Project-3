import allContent from "../../dummyData";
import axios from "axios";
import ContentCard from "../components/ContentCard";
import { useState, useEffect } from "react";
import { checkProgress } from "../functions/userMediaFunctions";

function UserMediaPage(props) {

    const [combinedMedia, setCombinedMedia] = useState([])
    const [startUpdate, setStartUpdate] = useState(false)
    const [filterType, setFilterType] = useState("all")
    const [displayInfo, setDisplayInfo] = useState(false)
    const [activeInfo, setActiveInfo] = useState({})
    const [input, setInput] = useState("")
    // const [filteredMedia, setFilteredMedia] = useState([])
    async function getUser(token) {
        try {
            // Setting the user
            const response = await axios.get("/api/users", {
                headers: {
                    Authorization: token
                }
            })
            console.log("response.data ", response.data)
            props.setUser(response.data)
            // Setting the user's data
            const data = await axios.get("/content", {
                headers: {
                    Username: props.user?.username
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

    useEffect(() => {
        // combined = [...allContent.bookData, ...allContent.gameData, ...allContent.movieData, ...allContent.tvData]
        // setCombinedMedia(combined)
        const token = localStorage.getItem("token")
        if (token) {
            // Get user info
            getUser(token)
        }

    }, [])


    // Update the active media card and check if completed
    async function updateProgress() {
        try {
            //Updates info on backend
            let updatedInfo = { ...activeInfo, progress: input }
            await axios.put("/content", updatedInfo)
            //checkProgress(activeInfo)
            //Gets all info again with updated content
            const data = await axios.get("/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            //console.log(data.data)
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)
        } catch (error) {
            console.log(error)
        }

    }

    function handleComplete() {
        if (!activeInfo.completed) {
            activeInfo.progress = activeInfo.length
            checkProgress(activeInfo)
            const indexNumber = combinedMedia.findIndex((item) => item.id == activeInfo.id)
            console.log(indexNumber)
            let fakeArray = [...combinedMedia]
            fakeArray.splice(indexNumber, 1, activeInfo)
            console.log(fakeArray)
            setCombinedMedia(fakeArray)
            setStartUpdate(false)
        } else {
            activeInfo.progress = "0"
            activeInfo.completed = false;
            const indexNumber = combinedMedia.findIndex((item) => item.id == activeInfo.id)
            console.log(indexNumber)
            let fakeArray = [...combinedMedia]
            fakeArray.splice(indexNumber, 1, activeInfo)
            console.log(fakeArray)
            setCombinedMedia(fakeArray)
            setStartUpdate(false)
        }

    }

    function handleChange(e) {
        setInput(e.target.value)
    }

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
                        displayInfo={displayInfo}
                        setDisplayInfo={setDisplayInfo}
                        setActiveInfo={setActiveInfo}
                        setStartUpdate={setStartUpdate}
                    />)}
                </section>
            </section>
            {displayInfo &&
                <section className="border-solid border-black border-2 w-2/5">
                    <h3>{activeInfo.name}</h3>
                    <h4>{activeInfo.type}</h4>
                    <h4>Your progress: {activeInfo.progress} {activeInfo.lengthType}</h4>
                    <h4>You are {((activeInfo.progress / activeInfo.length) * 100).toFixed(2)} % complete</h4>
                    <h4>Total Length: {activeInfo.length} {activeInfo.lengthType}</h4>
                    <button onClick={() => setStartUpdate(true)}>Update Progress</button>
                    <br /><br />
                    <button onClick={handleComplete}>{activeInfo.completed == false ? "Mark as Complete" : "Mark as Incomplete"}</button>
                    {startUpdate &&
                        <div>
                            <h3>How many {activeInfo.lengthType} did you complete</h3>
                            <input type="number" value={input} onChange={handleChange} />
                            <button onClick={updateProgress}>Submit</button>
                        </div>
                    }
                </section>
            }
        </div>
    );
}

export default UserMediaPage;