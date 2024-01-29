import { getGameInfo, getBookInfo, getMovieInfo, getTvInfo } from "../functions/specificSearch";



function SearchCard({ con, setSelectedSearch }) {


    async function handleClick() {
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
        <div className='border-green-800 border-solid border-2 w-56 h-72 hover:bg-green-900' onClick={handleClick}>
            <div className='w-full'>
                <img src={con.imgURL} alt="No picture found" className='w-full' />
            </div>
            <h2>{con.name}</h2>
            {con.author && <h2>Author: {con.author}</h2>}
        </div>
    );
}

export default SearchCard;