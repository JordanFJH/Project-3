import axios from "axios";
import { useState, useEffect } from "react";

function DisplaySelectedSearch({ con, user, library, setSelectedSearch, setLibrary }) {

    let lengthType = "";
    let exists = false;
    let [added, setAdded] = useState(false)

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

    // Check if media already exists in the user's library
    async function checkLibrary() {

        let checkingLibrary = []
        try {
            const response = await axios.get("/content", {
                headers: {
                    Username: user.username
                }
            })

            let data = response.data
            checkingLibrary = data
        } catch (error) {
            console.log(error)
        }

        for (const item of checkingLibrary) {
            if (con.name == item.name && con.id == item.id) {
                console.log("Item exists in library")
                setAdded(true);
            } else {
                console.log("Item does not exist in library")
            }
        }
    }

    useEffect(() => {
        checkLibrary()
    }, [])


    //Function for adding media to library
    async function addMedia() {
        try {
            let singleObj = {
                name: con.name,
                type: con.type,
                length: con.length,
                desc: con.desc,
                infoLink: con.infoLink,
                imgURL: con.imgURL,
                id: con.id,
                author: con.author
            }
            await axios.post("/content", singleObj, {
                headers: {
                    Username: user.username
                }
            })
            setAdded(true)

            //Functionality for getting the user data, don't think I need this for here
            // May reenable for comparing if already in library
            const data = await axios.get("/content", { // get user collection again
                headers: {
                    Username: props.user?.username
                }
            })
            // console.log("From the addmedia ", data.data)
            setLibrary(data.data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="w-3/6 h-1/2 absolute bg-green-500 overflow-y-scroll flex flex-col border-solid border-black border-4 rounded">
            <button className="absolute right-0" onClick={() => { setSelectedSearch({}) }}>X</button>
            <div className="flex p-3">
                <div className='w-1/2'>
                    <img src={con.imgURL} alt="Picture Not Found" className='w-full' />
                </div>
                <div className='flex flex-col items-center w-1/2'>
                    <h2>{con.name}</h2>
                    {con.author && <h2 className='mt-0'>{con.author}</h2>}
                    <h2>Length: {con.length} {lengthType}</h2>
                    {con.infoLink &&
                        <a href={con.infoLink} target="_blank" rel="noopener noreferrer">Click for more info</a>}
                </div>
            </div>
            <div className="text-center">
                <hr className="border-black border-solid border-2" />
                <h2 className='mb-0 underline'>Overview</h2>
                <h3 className=''>{con.desc}</h3>
                {added == true ? <h2>In Your Library</h2> : <button onClick={addMedia}>Add Media</button>}
            </div>



        </div>
    );
}

export default DisplaySelectedSearch;