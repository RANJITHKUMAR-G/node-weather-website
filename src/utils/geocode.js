const request = require('request')
const geocode = (address,callback)=>{
    // encodeURIComponent(address)
    const mapBoxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmFuajF0aCIsImEiOiJja3d3NXQ3ODUwMGtjMm91cnJqeWowcXR0In0.kawNQgD2W_KWNrWQh_S0HA&limit=1'
    request({url:mapBoxURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect location services!',undefined)
        }else if(response.body.features.length==0){
            callback('Unable to find location, Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longtitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
            
}

module.exports=geocode