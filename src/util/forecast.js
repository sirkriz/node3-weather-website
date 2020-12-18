const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3e2674f154ef1e81e49c41bb21a0b833&query=" + latitude + "," + longitude;

    request(
            {url, json: true},
            (error, {body}) => {
                if (error) {
                    callback("Unable to connect to location services", undefined);
                } else if (body.error) {
                    callback("Unable to get forecast", undefined);
                } else {
                    const data = body.current;
                    callback(undefined, {
                        description: data.weather_descriptions[0],
                        temperature: data.temperature,
                        precip: data.precip
                    });
            }

    });
};

module.exports = forecast;