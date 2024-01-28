import { useState } from "react";


function SearchPage(props) {

    let [mediaType, setMediaType] = useState("")

    async function handleSubmit(e) {
        console.log("handling Submit")
    }

    return (
        <div className="search-main">
            <section className="border-solid border-black border-2 w-2/6 h-1/4">
                <div>
                    <button onClick={() => setMediaType("Movie")}>Movie</button>
                    <button onClick={() => setMediaType("TV Show")}>Tv Show</button>
                    <button onClick={() => setMediaType("Game")}>Game</button>
                    <button onClick={() => setMediaType("Book")}>Book</button>
                </div>
                <h3>{mediaType ? `Looking for a ${mediaType}`  : "Choose option to search"}</h3>
                <br /><br />
                <label htmlFor="">Search by Name</label>
                <input type="text" />
                <button onClick={handleSubmit}>Search</button>
            </section>
            <div className="border-solid border-black border-2 flex h-3/5 w-2/3 justify-between">
                <section className="border-solid border-black border-2 w-2/5">
                    Search Results
                </section>
                <section className="border-solid border-black border-2 w-2/5">
                    In depth search
                </section>
            </div>
        </div>
    );
}

export default SearchPage;