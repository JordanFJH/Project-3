
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
            trendingArray.push(movieObj)
        }
        console.log("Edited Trending Array", trendingArray)
        setTrendingContent(trendingArray)
    } catch (error) {
        console.log(error)
    }
}