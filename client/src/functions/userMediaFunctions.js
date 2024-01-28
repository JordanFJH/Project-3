
let movieKey = import.meta.env.VITE_MOVIE_Token
const trendingURL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US'



export function checkProgress(info) {
    console.log(info)
    if (info.progress >= info.length && info.type != "game") {
        console.log("Completed")
        info.progress = info.length
        info.completed = true
        info.consuming = false
    } else if (info.progress >= info.length && info.type == "game") {
        
    }
}


// Setting array for trending content
export async function getTrendingContent(setTrendingContent) {
    console.log("Getting Trending Content")
    let trendingArray = []
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + movieKey
            }
        }
        let response = await fetch(trendingURL, options)
        let data = await response.json()
        data = data.results
        console.log("Trending Movie Data", data)
        data = data.filter((con) => con.title?.length > 0)
        for (const result of data) {
            let movieObj = {}
            movieObj.name = result.title
            movieObj.id = result.id
            movieObj.type = result.media_type
            movieObj.imgURL = `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            trendingArray.push(movieObj)
        }
        
        console.log("Edited Trending Array", trendingArray)
        setTrendingContent(trendingArray)
    } catch (error) {
        console.log(error)
    }
}


// Setting single trend content for more info
export async function getOneTrend(con, setSpecificTrend) {
    console.log("Trying to get individual data")
    let oneObj = {}
    let activeLink = ""
    const movieDetails = `https://api.themoviedb.org/3/movie/${con.id}?language=en-US`
    const tvDetails = `https://api.themoviedb.org/3/tv/${con.id}?language=en-US`
    if (con.type == "movie") {
        activeLink = movieDetails
        oneObj.type = "movie"
    } else if (con.type == "tv") {
        activeLink = tvDetails
        oneObj.type = "tv"
    }
    console.log("Getting Individual Content")
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + movieKey
            }
        }
        let response = await fetch(activeLink, options)
        let data = await response.json()
        console.log("Individual data", data)
        oneObj = {
            ...oneObj,
            name: data.title,
            id: data.id,
            length: data.runtime,
            desc: data.overview,
            imgURL: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        }
        setSpecificTrend(oneObj)
    } catch (error) {
        console.log(error)
    }
}