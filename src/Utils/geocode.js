const request = require('request')


console.log("Starting!")
setTimeout(()=>{
    console.log("2mns asynchroneous")
},2000)

setTimeout(()=>{
    console.log("0 asynchroneous!")
},0)


console.log("Starting!")

const geocode = ((address1, address2, callback)=>{
    //const url = 'https://api.mapbox.com/geooding/v5/mapbox.places/'+ address +'Los%20Angeles.json?'
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + address1 + ' , ' + address2 + '%2C+USA&key=14f1761f63c64c80b91ca9a0111cd7bd'
    request({url: url, json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to service locations',undefined)
        }
        else{
            //console.log(response.body.results[1].bounds.northeast)
            callback(undefined,{
                latitude:response.body.results[1].bounds.northeast.lat,
                longitude:response.body.results[1].bounds.northeast.lng,
             })
        }
    })
})


module.exports = geocode