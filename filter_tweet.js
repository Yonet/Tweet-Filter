var fs = require('fs'),
    util = require('util');

module.exports.filter =  filter = function (data) {
  var result = [];
  // var baseUrl = 'http://www.twitter.com/';
  data = data.statuses;
  // for (var i = 0; i < data.length; i++) {
  //   console.log(data[i]['user']['location']);
  // };

  var len = data.length;
  console.log(len);
  for (var i = 0; i < len; i++) {
    // Flag to check if geo data is present and where
    var geoFlag = false;
    if (data[i]['geo']) {
      geoFlag = 1;
    } else if (data[i]['user']['location'].match(/^-?\d+\.\d+$/)) {
      geoFlag = 2;
    } else if (data[i].hasOwnProperty('retweeted_status') && data[i]['retweeted_status'].hasOwnProperty('user') && data[i]['retweeted_status']['user']['location'].match(/^-?\d+\.\d+$/)) {
      geoFlag = 3;
    }
    // If geo data is present
    if (geoFlag) {
      // Initialize result data
      n = result.length;
      result.push({});
      result[n]['geo'] = {};
      var lat, lon;
      var tempLoc;
      var currentYear = new Date().getFullYear();
      var date = data[i]['created_at'].split(' ');
      var tempDate = [];
      // Store geo data
      if (geoFlag === 1) {
        result[n]['geo']['lat'] = data[i]['geo']['coordinates'][0];
        result[n]['geo']['lon'] = data[i]['geo']['coordinates'][1];
      } else if (geoFlag === 2) {
        tempLoc = data[i]['user']['location'].split(',');
        result[n]['geo']['lat'] = tempLoc[0];
        result[n]['geo']['lon'] = tempLoc[1];
      } else {
        tempLoc = data[i]['retweeted_status']['user']['location'].split(',');
        result[n]['geo']['lat'] = tempLoc[0];
        result[n]['geo']['lon'] = tempLoc[1];
      }
      // Store tweet text
      result[n]['text'] = data[i]['text'];
      
      // Prepare creation date
      if (date[2][0] === '0') {
        date[2] = date[2].slice(1);
      }
      tempDate[0] = date[2];
      tempDate[1] = date[1];
      date[date.length-1] != currentYear && (tempDate[2] = date[date.length-1]);
      // Store creation date
      result[n]['date'] = tempDate.join(' ');
      // Store author name
      result[n]['name'] = data[i]['user']['name'];
      // Store author username
      result[n]['username'] = data[i]['user']['screen_name'];
      // Store profile image
      result[n]['profileImage'] = data[i]['user']['profile_image_url'];
    }
  }
  console.log(result);
  return result;
};
var tweets = fs.readFile('tweets.json', function (err, data) {
  if (err) throw err;
  console.log('load tweet');
  data = JSON.parse(data);
  //console.log(data);
  filter(data);

  return data;
});