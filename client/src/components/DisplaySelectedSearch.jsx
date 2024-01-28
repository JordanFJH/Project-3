import axios from "axios";
import { useState } from "react";

function DisplaySelectedSearch({ con, user }) {

    let lengthType = "";
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

    async function addMedia() {
        try {
            let singleObj = {
                name: con.name,
                type: con.type,
                length: con.length,
                desc: con.desc,
                imgURL: con.imgURL,
                id: con.id
            }
            await axios.post("/content", singleObj, {
                headers: {
                    Username: user.username
                }
            })
            setAdded(true)
            

            //Functionality for getting the user data, don't think I need this for here
            // May reenable for comparing if already in library
            // const data = await axios.get("/content", { // get user collection again
            //     headers: {
            //         Username: props.user?.username
            //     }
            // })
            // console.log("From the addmedia ", data.data)
            // setCombinedMedia(data.data)
        } catch (error) {
            console.log(error)
        }

    }

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
                {added == true ? <h2>In Library</h2> : <button onClick={addMedia}>Add Media</button>}
                
            </div>

        </div>
    );
}

export default DisplaySelectedSearch;