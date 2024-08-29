const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error checking password:', error);
        throw error;
    }
}

const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
};

const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
};

module.exports = {
    hashPassword,
    verifyPassword,
    celsiusToFahrenheit,
    fahrenheitToCelsius
}