import React from 'react';

function DisplaySelectedSearch({ con }) {

    let lengthType = "";

    function setLengthType() {
        switch (con.type) {
            case "movie":
                lengthType = "minutes"
                break;
            case "tv":
                lengthType = "episodes"
                break;
            case "game":
                lengthType = "hours (average)"
                break;
            case "book":
                lengthType = "pages"
                break;
            default:
                break;
        }
    }

    setLengthType()

    return (
        <div className=''>
            <div className='w-full'>
                <img src={con.imgURL} alt="Picture Not Found" className='w-full' />
            </div>
            <div className='flex flex-col items-center'>
                <h2>{con.name}</h2>
                {con.author && <h2 className='mt-0'>{con.author}</h2>}
                <h2>Length: {con.length} {lengthType}</h2>
                <h2 className='mb-0 underline'>Overview</h2>
                <h3 className=''>{con.desc}</h3>
                <button>Add Media</button>
            </div>

        </div>
    );
}

export default DisplaySelectedSearch;