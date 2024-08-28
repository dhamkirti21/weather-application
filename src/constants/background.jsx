const weatherList = {
    "clear sky": "clear-sky",
    "few clouds": "clear-sky",
    "scattered clouds": "cloudy",
    "broken clouds": "cloudy",
    "shower rain": "thunderstorm",
    "rain": "thunderstorm",
    "thunderstorm": "thunderstorm",
    "snow": "snowfall",
    "mist": "snowfall"
}

const getBackground = (weather) => {

    if (!weather) {
        console.log("weather not provided")
        return "/videos/" + weatherList["clear-sky"] + ".webm"
    }

    if (!weatherList.hasOwnProperty(`${weather}`)) {
        return "/videos/" + weatherList[`${weather}`] + ".webm"
    }

    const backgroundPath = "/videos/" + weatherList[weather] + ".webm";
    return backgroundPath;
}

export default getBackground;