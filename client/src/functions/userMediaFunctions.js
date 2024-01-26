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