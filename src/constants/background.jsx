const weatherList = {
    "clear-sky": "clear-sky",
    "thunderstorm": "thunderstorm",
}

const getBackground = (weather) => {
    if (!weather) {
        console.log("weather not provided")
        return "/videos/" + weatherList["clear-sky"] + ".webm"
    }

    if (!weatherList.hasOwnProperty(`${weather}`)) {
        return "/videos/" + weatherList["clear-sky"] + ".webm"
    }

    const backgroundPath = "/videos/" + weatherList[weather] + ".webm";
    return backgroundPath;
}

export default getBackground;