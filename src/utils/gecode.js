const request       = require('request')

const gecode        = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2lsbGlhbmxheTA3IiwiYSI6ImNsYzhpa3Z6YTF3eWEzeHBwMXk2eDZvdTUifQ.p_yhj7jj6_PdVjs1B7M1ZQ&limit=1'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to MapBox!', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                locationName: body.features[0].place_name,
            })
        }
    })
}

module.exports      = gecode