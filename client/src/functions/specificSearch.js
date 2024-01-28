let gameKey = import.meta.env.VITE_GAME_Token
let tvMovieKey = import.meta.env.VITE_MOVIE_Token
let bookKey = import.meta.env.VITE_BOOK_Token

// NEED
// Length, name, id, desc, type, image URL

export async function getBookInfo() {
    console.log("Getting book info")

}

export async function getGameInfo() {
    console.log("Getting Game info")
}

export async function getTvInfo() {
    console.log("Getting Television info")
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
            length: data.runtime
        }
        setSelectedSearch(movieObj)
      } catch (error) {
        console.log(error)
      }
}