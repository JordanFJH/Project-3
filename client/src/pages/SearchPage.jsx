import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../baseURL";
import SearchCard from "../components/SearchCard";
import DisplaySelectedSearch from "../components/DisplaySelectedSearch";
import { getMovieArray, getBookArray, getTVArray, getGameArray } from "../functions/searchArrays";


function SearchPage(props) {

    let [searched, setSearched] = useState("")
    let [mediaType, setMediaType] = useState("")
    let [input, setInput] = useState("")
    let [selectedSearch, setSelectedSearch] = useState({})
    let [arrayList, setArrayList] = useState([])
    let [library, setLibrary] = useState([])

    async function getUser(token) {
        try {
            const response = await axios.get(baseURL + "/api/users", {
                headers: {
                    Authorization: token
                }
            })
            props.setUser(response.data)
            console.log("Checking the username", response.data?.username)
            const data = await axios.get(baseURL + "/content", { // get user collection again
                headers: {
                    Username: response.data?.username
                }
            })
            console.log("From the search page ", data.data)
            setLibrary(data.data)
        } catch (error) {
            console.log(error)
        }
        // try {
        //     const data = await axios.get("/content", { // get user collection again
        //         headers: {
        //             Username: props.user.username
        //         }
        //     })
        //     console.log("The data", data)
        //     console.log("From the search page ", data.data)
        //     setLibrary(data.data)
        // } catch (error) {
        //     console.log(error)
        // }
        

    }

    useEffect(() => {
        console.log("In the UseEffect")
        const token = localStorage.getItem("token")
        if (token) {
            // Get user info
            getUser(token)
        } else {
            //setIsLoading(false)
        }
    }, [])

    async function handleSubmit(e) {
        if (!mediaType) { // Exits submit function if search input is empty
            return
        }
        console.log("handling Submit")
        setSearched(input)
        switch (mediaType) {
            case "Movie":
                getMovieArray(input, setArrayList)
                break;

            case "TV Show":
                getTVArray(input, setArrayList)
                break;

            case "Game":
                getGameArray(input, setArrayList)
                break;

            case "Book":
                getBookArray(input, setArrayList)
                break;

            default:
                break;
        }
    }

    function handleChange(e) {
        setInput(e.target.value)
    }

    function settingMediaType(e) {
        setMediaType(e.target.value)
    }

    return (
        <div className="search-main">
            {selectedSearch.name &&
                <DisplaySelectedSearch
                    con={selectedSearch}
                    user={props.user}
                    library={library}
                    setLibrary={setLibrary}
                    setSelectedSearch={setSelectedSearch}
                />}
            <section className="border-solid border-black border-4 w-3/12 h-3/4 mr-6 rounded bg-purple-300">
                <div className="text-center mt-2">
                    <form name="filter-content">
                        <label htmlFor="filter-content">Select Content Type: </label>
                        <select name="filter-content" id="filter-content" onChange={(e) => settingMediaType(e)}>
                            <option value="">--Select One--</option>
                            <option value="Book">Books</option>
                            <option value="Movie">Movies</option>
                            <option value="TV Show">TV Shows</option>
                            <option value="Game">Games</option>
                        </select>
                    </form>
                </div>
                <div className="text-center">
                    {mediaType ? <div>
                        <h2 className="underline">Searching For:</h2>
                        <h2>{mediaType}</h2>
                    </div> : <h3>Choose Option to search</h3>}
                </div>
                <br />
                <div className="text-center">
                    <h2>Enter Name of Content:</h2>
                    <input type="text" value={input} onChange={handleChange} />
                    <br /><br />
                    <div className="flex justify-around">
                        <button onClick={() => { setArrayList([]); setInput(""); setSelectedSearch({}) }}>Clear Search</button>
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                </div>
                <br />
                {arrayList.length > 0 &&
                    <div className="text-center">
                        <h2 className="underline">Search results for {searched} {mediaType}</h2>
                        <h2>{arrayList.length}</h2>
                    </div>
                }
            </section>
            <div className="flex h-3/4 w-2/3">
                {arrayList.length > 0 ? <section className="border-solid border-black border-4 overflow-y-scroll flex flex-wrap bg-yellow-200 justify-around rounded bg-purple-300">
                    {arrayList.map((con, index) => <SearchCard
                        con={con}
                        key={index}
                        setSelectedSearch={setSelectedSearch}
                    />)}
                </section>
                    :
                    <div className="w-2/3 text-center bg-purple-300">
                        <h1>There is no data to consume!</h1>
                        <h1>Please Search for Content to Consume on the left</h1>
                        <div className="w-full">
                            <img src="/img/dead_pacman.gif" alt="Pic of pacman" className="w-full" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchPage;