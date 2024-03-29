import allContent from "../../dummyData";
import axios from "axios";
import baseURL from "../../baseURL";
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

    //Getting user and data
    async function getUser(token) {
        try {
            // Setting the user
            const response = await axios.get(baseURL + "/api/users", {
                headers: {
                    Authorization: token
                }
            })
            console.log("response.data ", response.data)
            props.setUser(response.data)
            // Setting the user's data
            const data = await axios.get(baseURL + "/content", {
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
        const token = localStorage.getItem("token")
        if (token) {
            // Get user info
            getUser(token)
        }

    }, [])

    //Handles the setting of game length
    async function addHourToGame() {
        console.log("Adding hour to total game length")
        let gameNum = Number(activeInfo.length)
        gameNum += 1
        activeInfo.length = gameNum.toString()
        await axios.put(baseURL + "/content", activeInfo)
        const data = await axios.get(baseURL + "/content", {
            headers: {
                Username: props.user?.username
            }
        })
        setCombinedMedia(data.data)
    }


    // Update the active media card and check if completed
    async function updateProgress() {
        try {
            if (activeInfo.completed) { // returns if the media is completed
                return
            }
            //Updates info on backend
            activeInfo.progress = input
            await axios.put(baseURL + "/content", activeInfo)

            //Gets all info again with updated content
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)
        } catch (error) {
            console.log(error)
        }

    }

    // Handle the completion of the content once clicked
    async function handleComplete() {
        if (!activeInfo.completed) {// If it's not completed
            activeInfo.progress = activeInfo.length //Setting progress to the total length
            activeInfo.completed = true // setting completed to true
            activeInfo.consuming = false
            await axios.put(baseURL + "/content", activeInfo)
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)

        } else {// If it is completed
            activeInfo.progress = "0"
            activeInfo.completed = false;
            await axios.put(baseURL + "/content", activeInfo)
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)
        }

    }

    // Handles change of typing in update content
    function handleChange(e) {
        setInput(e.target.value)
    }

    async function handleConsuming() {
        if (activeInfo.completed) {
            return
        }
        if (!activeInfo.consuming) { // if media is not being consumed
            activeInfo.consuming = true
            await axios.put(baseURL + "/content", activeInfo)
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)

        } else { // if media is being consumed
            activeInfo.consuming = false
            await axios.put(baseURL + "/content", activeInfo)
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
            setInput("")
            setStartUpdate(false)
        }

    }
    // Remove the selected media
    async function handleRemove() {
        let payload = { ...activeInfo }
        payload.username = props.user?.username
        console.log("payload sent to delete", payload)
        try {
            await axios.delete(baseURL + "/content", { data: payload })
            setDisplayInfo(false)
            const data = await axios.get(baseURL + "/content", {
                headers: {
                    Username: props.user?.username
                }
            })
            setCombinedMedia(data.data)
        } catch (error) {
            console.log(error)
        }
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
            case "complete":
                if (item.completed == true) {
                    return true
                }
                break;
            case "incomplete":
                if (item.completed == false) {
                    return true
                }
                break;
            case "consuming":
                if (item.consuming == true) {
                    return true
                }
                break;
            default:
                break;
        }
    })

    // Function for filtering display array
    function filterDisplay(e) {
        setFilterType(e.target.value)
    }

    // console.log("UserMedia Page:" + state)
    return (
        <div className="user-media-main">
            <section className="border-black border-solid border-2 bg-purple-300 w-1/6 mr-20 h-3/4 text-center">
                <div className="h-full">
                    <h2>Show Me My</h2>
                    <hr className="border-black border-2 border-solid" />
                    {/* div for the buttons */}
                    <div className="h-3/5 flex flex-col justify-around items-center">
                        <button onClick={() => setFilterType("all")}>All</button>
                        <button onClick={() => setFilterType("book")}>Books</button>
                        <button onClick={() => setFilterType("movie")}>Movies</button>
                        <button onClick={() => setFilterType("tv")}>TV Shows</button>
                        <button onClick={() => setFilterType("game")}>Games</button>
                        <button onClick={() => setFilterType("complete")}>Completed</button>
                        <button onClick={() => setFilterType("incomplete")}>Not Completed</button>
                        <button onClick={() => setFilterType("consuming")}>Consuming</button>
                    </div>
                    <h2 className="underline">Displaying</h2>
                    <h2>{filterType}</h2>
                </div>
            </section>
            <section className="border-solid border-black border-2 w-3/5 flex items-center bg-purple-300 h-3/4">
                <section className="w-full h-full flex flex-wrap overflow-y-scroll justify-around">
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
                <section className="border-solid border-black border-2 w-3/5 h-3/4 bg-purple-300 absolute">
                    <div className="flex h-1/2">
                        <div className="h-full w-1/2">
                            <div className="w-full h-full">
                                <img src={activeInfo.imgURL} alt="Picture of content" className="w-full h-full" />
                            </div>
                        </div>
                        <div className="h-full w-1/2 text-center overflow-y-scroll">
                            <h1>{activeInfo.name}</h1>
                            {activeInfo.author &&
                                <h2>{activeInfo.author}</h2>
                            }
                            <h3>{activeInfo.type}</h3>
                            <a href={activeInfo.infoLink} target="_blank" rel="noopener noreferrer">Click for more info</a>
                            <h3>Your progress: {activeInfo.progress} {activeInfo.lengthType}</h3>
                            <h3>You are {((activeInfo.progress / activeInfo.length) * 100).toFixed(2)} % complete</h3>
                            <h3>Total Length: {activeInfo.length} {activeInfo.lengthType}</h3>
                            <h3 className="underline">Overview</h3>
                            <h4>{activeInfo.desc}</h4>
                        </div>
                    </div>
                    <hr className="border-solid border-2 border-black" />
                    <div className="flex flex-col">
                        <button onClick={() => setDisplayInfo(false)}>Close</button>
                        <button onClick={handleConsuming}>{activeInfo.consuming ? "Stop Consuming" : "Start Consuming"}</button>
                        <br /><br />
                        <button onClick={() => setStartUpdate(true)}>Update Progress</button>
                        <br /><br />
                        {startUpdate &&
                            <div className="text-center mt-0">
                                <h3>How many {activeInfo.lengthType} did you complete</h3>
                                <input type="number" value={input} onChange={handleChange} />
                                <button onClick={updateProgress}>Submit</button>
                            </div>
                        }
                        {activeInfo.type == "game" ? <button onClick={addHourToGame}>Add Hour to Game Length</button> : ""}
                        <button onClick={handleComplete}>{activeInfo.completed == false ? "Mark as Complete" : "Mark as Incomplete"}</button>
                        <br /><br />
                        <button onClick={handleRemove}>Remove Media</button>
                    </div>

                </section>
            }
        </div>
    );
}

export default UserMediaPage;