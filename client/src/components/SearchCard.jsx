

function SearchCard({ con, setSelectedSearch }) {


    return (
        <div className='border-green-800 border-solid border-2'>
            <div className='w-full'>
                <img src={con.imgURL} alt="No picture found" className='w-full'/>
            </div>
            <h2>{con.name}</h2>
            {con.author && <h2>Author: {con.author}</h2>}
        </div>
    );
}

export default SearchCard;