const request=require('request')
const forecast = (latitude,longtitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=97c4ad2e305ea84b61a39bad01c64bc6&query='+latitude+','+longtitude//+'&units=f'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect weather service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            const weather = response.body.current.weather_descriptions[0]
            const humidity = response.body.current.humidity
            callback(undefined,weather+' It is currently '+temperature+' degrees out. It feels like '+feelslike+' degress out. The humidity is '+humidity+'%')
        }
    })
}

module.exports=forecast