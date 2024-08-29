const { celsiusToFahrenheit, fahrenheitToCelsius } = require("../utils/utils")


const convertCtoF = (req, res) => {
    const { value } = req.params
    if (!value) {
        return res.status(404).json({
            message: "value is required"
        })
    }

    console.log(value)
    const covertedValue = celsiusToFahrenheit(value);

    res.status(200).json({
        newValue: covertedValue
    })

}

const convertFtoC = (req, res) => {
    const { value } = req.params
    if (!value) {
        return res.status(404).json({
            message: "value is required"
        })
    }

    const covertedValue = fahrenheitToCelsius(value);

    res.status(200).json({
        newValue: covertedValue
    })

}



module.exports = {
    convertFtoC,
    convertCtoF
}