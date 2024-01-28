let gameKey = import.meta.env.VITE_GAME_Token
let tvMovieKey = import.meta.env.VITE_MOVIE_Token
let bookKey = import.meta.env.VITE_BOOK_Token


// Getting movie array
export async function getMovieArray(input, setArrayList) {
    console.log("Getting Movie Content")
    let movieArray = []
    let searchPhrase = encodeURI(input)
    let URL = `https://api.themoviedb.org/3/search/movie?query=${searchPhrase}&include_adult=true&language=en-US&page=1`
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + tvMovieKey
            }
        }
        let response = await fetch(URL, options)
        let data = await response.json()
        data = data.results
        console.log("Movie Search Data", data)
        // data = data.filter((con) => con.title?.length > 0)
        for (const result of data) {
            let movieObj = {}
            movieObj.name = result.title
            movieObj.id = result.id
            movieObj.type = "movie"
            movieObj.imgURL = `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            movieArray.push(movieObj)
        }
        setArrayList(movieArray)

    } catch (error) {
        console.log(error)
    }

}

export async function getTVArray(input, setArrayList) {
    console.log("Getting Television Content")
    let tvArray = []
    let searchPhrase = encodeURI(input)
    let URL = `https://api.themoviedb.org/3/search/tv?query=${searchPhrase}&include_adult=true&language=en-US&page=1`
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + tvMovieKey
            }
        }
        let response = await fetch(URL, options)
        let data = await response.json()
        data = data.results
        console.log("Movie Search Data", data)
        // data = data.filter((con) => con.title?.length > 0)
        for (const result of data) {
            let tvObj = {
                name: result.name,
                id: result.id,
                type: "tv",
                imgURL: `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            }
            tvArray.push(tvObj)
        }
        setArrayList(tvArray)

    } catch (error) {
        console.log(error)
    }
}


// Searching for a game
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
                id: result.id,
                type: "game"
            }
            fakeArray.push(fakeObj)
        }
        console.log("edited game result", fakeArray)
        setArrayList(fakeArray)
    } catch (error) {
        console.log(error)
    }


}

// Searching for book
export async function getBookArray(input, setArrayList) {
    console.log("Getting book content")
    let searchPhrase = encodeURI(input)
    let bookArray = []
    let URL = `https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}&key=${bookKey}`
    try {
        const response = await fetch(URL)
        let data = await response.json()
        data = data.items
        console.log("Book search: ", data)
        for (const result of data) {
            let bookObj = {
                id: result.id,
                type: "book",
                name: result.volumeInfo.title,
                imgURL: result.volumeInfo.imageLinks.thumbnail
            }
            bookArray.push(bookObj)
        }
        setArrayList(bookArray)
    } catch (error) {
        console.log(error)
    }

}