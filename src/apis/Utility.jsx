const fetchApi = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch data:', response.statusText);
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("error fetching weather data")
        console.error("We ran into a problem", {
            err: error.message
        });
    }

}

const getEnv = (alias) => {
    const envData = JSON.stringify(import.meta.env[alias]);
    return envData
}


const getAirQuality = (aqi) => {
    const airQualityMap = [
        { max: 80, label: "Very Good", desc: "Air quality is suitable for outdoor activity. No significant impact on health." },
        { max: 160, label: "Good", desc: "Air quality is acceptable; however, there may be a mild impact on health for a very small number of people sensitive to air pollution." },
        { max: 240, label: "Moderate", desc: "Air quality may be a concern for some people, especially those with respiratory issues or sensitivity to pollution. General public is not likely to be affected." },
        { max: 320, label: "Poor", desc: "Air quality is likely to have a significant impact on health for all individuals. Sensitive groups may experience health effects, and the general public may begin to experience adverse health effects." },
        { max: 400, label: "Very Poor", desc: "Air quality is likely to have a serious impact on health for all individuals. Everyone may experience more serious health effects and should minimize outdoor activities." },
        { max: Infinity, label: "Hazardous", desc: "Air quality is extremely poor and poses a serious risk to health. Everyone is likely to be affected, and outdoor activities should be avoided as much as possible." }
    ];

    if (aqi < 0) return "Invalid AQI";

    for (const range of airQualityMap) {
        if (aqi <= range.max) {
            return {
                label: range.label,
                desc: range.desc
            }
        }
    }

}
export { fetchApi, getEnv, getAirQuality }