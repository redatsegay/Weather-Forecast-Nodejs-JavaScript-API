
const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    // Ensure that callback is indeed a function before proceeding
    if (typeof callback !== 'function') {
        console.error('Error: The callback provided is not a function!');
        return; // Exit the function if callback is not a function
    }
    // Dynamic URL based on function parameters
    const forecastURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=db452113c5dfe4d81f50e6538b886eae`;

    request({ url: forecastURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('It seems like you are not connected to the internet. Please check again later!', undefined);
        } else if (body.error) {
            callback('Unable to find location, please try again!', undefined);
        } else if (!body.current) {
            callback('Missing current weather data in the response.', undefined);
        } else {
            callback(undefined, {

                temperature: body.current.temp, // temp
                feelsLike: body.current.feels_like, // feels_like
                pressure: body.current.pressure,// pressure
                humidity: body.current.humidity, // humidity
                timezone: body.timezone,
                description: body.current.weather[0].description
            });
        }
    });
};

module.exports = forecast
