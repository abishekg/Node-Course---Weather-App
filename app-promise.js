const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBgh3PZGcJpwiGPeu-BbAykyaubZ-I7Zgc`;

axios.get(geoCodeURL).then((response) => {
  // console.log(response.data);
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address')
  }
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;

  var weatherURL = `https://api.forecast.io/forecast/bb8577ee90ddbe6e3bd96719f91fcd03/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temp}'F. It feels like ${apparentTemp}'F.`);

})
  .catch((err) => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(err.message);
    }

  });

