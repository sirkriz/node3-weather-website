const request = require("request");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaGNocmlzdHkiLCJhIjoiY2tpcjV6aHd3MDRubjJ2bm0xN2RuNjQ3cSJ9.NdpN2sz_til_X-8GaI_6nA&limit=1";

    request(
            {url, json: true},
            (error, {body}) => {
                if (error) {
                    callback("Unable to connect to location services", undefined);
                } else if (body.features.length === 0) {
                    callback("Unable to find location. Try another search", undefined);
                } else {
                    callback(undefined, {
                        longitude: body.features[0].center[0],
                        latitude: body.features[0].center[1],
                        location: body.features[0].place_name
                    });
                }
            }
    );
};

module.exports = geoCode;