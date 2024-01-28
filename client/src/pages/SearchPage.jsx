import { useState } from "react";
import SearchCard from "../components/SearchCard";
import DisplaySelectedSearch from "../components/DisplaySelectedSearch";
import { getMovieArray, getBookArray, getTVArray, getGameArray } from "../functions/searchArrays";


function SearchPage(props) {

    let [mediaType, setMediaType] = useState("")
    let [input, setInput] = useState("")
    let [selectedSearch, setSelectedSearch] = useState({})
    let [arrayList, setArrayList] = useState([])

    async function handleSubmit(e) {
        if (!mediaType) { // Exits submit function if search input is empty
            return
        }
        console.log("handling Submit")
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

    return (
        <div className="search-main">
            <section className="border-solid border-black border-2 w-2/6 h-1/4">
                <div className="flex justify-around">
                    <button onClick={() => setMediaType("Movie")}>Movie</button>
                    <button onClick={() => setMediaType("TV Show")}>Tv Show</button>
                    <button onClick={() => setMediaType("Game")}>Game</button>
                    <button onClick={() => setMediaType("Book")}>Book</button>
                </div>
                <h3>{mediaType ? `Looking for a ${mediaType}` : "Choose option to search"}</h3>
                <br /><br />
                <label htmlFor="search">Search by Name</label>
                <input type="text" value={input} onChange={handleChange} />
                <button onClick={handleSubmit}>Search</button>
                <br />
                <button onClick={() => {setArrayList([]); setInput("")}}>Clear Search</button>
            </section>
            <div className="border-solid border-black border-2 flex h-3/5 w-2/3 justify-between">
                <section className="border-solid border-black border-2 w-2/5 overflow-scroll">
                    {arrayList.map((con, index) => <SearchCard
                        con={con}
                        key={index}
                        setSelectedSearch={setSelectedSearch}
                    />)}
                </section>
                <section className="border-solid border-black border-2 w-2/5">
                    <DisplaySelectedSearch con={selectedSearch}/>
                </section>
            </div>
        </div>
    );
}

export default SearchPage;