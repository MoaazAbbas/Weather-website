const axios = require("axios")

const geoCode = async (address, callback) => {
    const response = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibW9hYXphYmJhcyIsImEiOiJja2ViOHAyZWYwNmZyMnltaTk2OXZzd2c2In0.Suj2ZgD1i53zPppuZDws-A")
    .then(({data}) => {
     callback(undefined, {
       latitude: data.features[0].center[1],
       longtude: data.features[0].center[0],
       location: data.features[0].place_name
     })
    }).catch((error)=>{
      if(error.response){
        callback("Enter valid countery", undefined);
      }else if (error.request) {
        callback("no internet connection", undefined);
      } else {
        callback("Enter valid countery", undefined);
      }
    })
  }

  module.exports = geoCode