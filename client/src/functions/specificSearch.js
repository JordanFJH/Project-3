let gameKey = import.meta.env.VITE_GAME_Token
let tvMovieKey = import.meta.env.VITE_MOVIE_Token
let bookKey = import.meta.env.VITE_BOOK_Token

// NEED
// Length, name, id, desc, type, image URL

export async function getBookInfo(con, setSelectedSearch) {
    console.log("Getting book info")
    const URL = `https://www.googleapis.com/books/v1/volumes/${con.id}?key=${bookKey}`
    try {
        const response = await fetch(URL)
        const data = await response.json()
        let bookObj = {
            ...con,
            desc: data.volumeInfo.description,
            length: data.volumeInfo.pageCount
        }
        setSelectedSearch(bookObj)
    } catch (error) {
        console.log(error)
    }
}

export async function getGameInfo(con, setSelectedSearch) {
    console.log("Getting Game info")
    const URL = `https://api.rawg.io/api/games/${con.id}?key=${gameKey}`
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    let gameObj = {
        ...con,
        desc: data.description,
        length: data.playtime,
        infoLink: data.website
    }
    setSelectedSearch(gameObj)
}

// Getting specific tv show clicked
export async function getTvInfo(con, setSelectedSearch) {
    console.log("Getting Television info")
    const URL = `https://api.themoviedb.org/3/tv/${con.id}?language=en-US`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tvMovieKey}`
        }
      };
      try {
        const response = await fetch(URL, options)
        const data = await response.json()
        console.log(data)
        let tvObj = {
            ...con,
            desc: data.overview,
            length: data.number_of_episodes,
            infoLink: data.homepage
        }
        setSelectedSearch(tvObj)
      } catch (error) {
        console.log(error)
      }
}

// Getting specific movie clicked
export async function getMovieInfo(con, setSelectedSearch) {
    console.log("Getting Movie info")
    const URL = `https://api.themoviedb.org/3/movie/${con.id}?language=en-US`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tvMovieKey}`
        }
      };
      try {
        const response = await fetch(URL, options)
        const data = await response.json()
        console.log(data)
        let movieObj = {
            ...con,
            desc: data.overview,
            length: data.runtime,
            infoLink: data.homepage
        }
        setSelectedSearch(movieObj)
      } catch (error) {
        console.log(error)
      }
}