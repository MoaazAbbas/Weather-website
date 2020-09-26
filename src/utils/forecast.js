const axios = require("axios");

const forecast = async (lat, lon, callback) => {
  const response = await axios({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,daily&appid=a8ea60bac451314db63b381af8d45c1c'
  }).then(({data}) => {
    callback(undefined, {
        temp: data.current.temp,
        description: data.current.weather[0].description
    })
  }).catch((error) =>{
      if(error.response){
            callback("please Enter the Valid cordnate", undefined)
      }else if(error.request){
            callback("There is no enternet connection", undefined)
      }else{
            callback(error.message, undefined)
      }
  })
}

module.exports = forecast



  
 