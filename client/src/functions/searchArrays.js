let gameKey = import.meta.env.VITE_GAME_Token

export async function getMovieArray(input, setArrayList) {

}

export async function getTVArray(input, setArrayList) {
    
}

export async function getGameArray(input, setArrayList) {
    let searchPhrase = encodeURI(input)
    let fakeArray = []
    let URL = `https://api.rawg.io/api/games?key=${gameKey}&search=${searchPhrase}`
    try {
        const response = await fetch(URL)
        let data = await response.json()
        data = data.results
        console.log("From game search", data)
        for (const result of data) {
            let fakeObj = {
                name: result.name,
                imgURL: result.background_image,
                id: result.id
            }
            fakeArray.push(fakeObj)
        }
        console.log("edited game result", fakeArray)
        setArrayList(fakeArray)
    } catch (error) {
        console.log(error)
    }


}

export async function getBookArray(input, setArrayList) {
    
}