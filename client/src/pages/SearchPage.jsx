

function SearchPage(props) {
    return (
        <div className="search-main">
            <section className="border-solid border-black border-2 w-2/6 h-1/4">
                <select name="type" id="">
                    <option value="tv">TV Show</option>
                    <option value="movie">Movie</option>
                    <option value="game">Games</option>
                    <option value="book">Books</option>
                </select>
                <br /><br />
                <label htmlFor="">Search by Name</label>
                <input type="text" />
                <button>Search</button>
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