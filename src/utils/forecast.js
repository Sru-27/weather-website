// weatherstack api with callback function

const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ef34ee463fa8c0d0f79da1260ea5faa&query=' + latitude + ',' + longitude + '&units=f'
request({url, json : true}, (error,{body}) => { // url - shorthand syntax & obj. destructuring
    if(error) {
        callback('Unable to connect to Weather service!',undefined) 
    } else if(body.error) {
        callback('Unable to find location!',undefined)
    } else{
    callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees out ')
    }
})
}

module.exports = forecast