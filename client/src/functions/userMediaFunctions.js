export function checkProgress(info) {
    console.log(info)
    if (info.progress >= info.length) {
        console.log("Completed")
        info.progress = info.length
        info.completed = true
        info.consuming = false
    } else {
        console.log("Not Completed")
    }
}