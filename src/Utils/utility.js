
const request = require('request');
const forecast = require('./forecast');
const geocode = require('./geocode');

// Assuming geoforecastAPI is defined to take a callback function as its parameter
const geoforecastAPI = (callback) => {
    const address1 = 'Roanoke';  // These should ideally come from request parameters or another source
    const address2 = 'Texas';

    if (!address1 || !address2) {
        callback('Please provide both city and state', null);
        return;
    }

    geocode(address1, address2, (error, geocodeData) => {
        if (error) {
            callback("Geocoding Error: " + error, null);
            return;
        }
        
        const { latitude, longitude } = geocodeData;

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                callback('Forecast Error: ' + error, null);
                return;
            }
            callback(null, forecastData);
        });
    });
}

module.exports = geoforecastAPI;
