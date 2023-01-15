const request       = require('request')

const forecast      = (latitude, longitude, callback) => {
    const url       = 'http://api.weatherstack.com/current?access_key=869e3a9f313338e095808245296b2436&query=' + latitude + ',' + longitude + '&units=f'

    request( {url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the Weather Service!', undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 'Today is ' + body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports      = forecast