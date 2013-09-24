var util = require('util'),
    twitter = require('twitter'),
    fs = require('fs');
    //filter = require('./filter_tweets.js');
var twit = new twitter({
    consumer_key: 'fsq4YbjfXuQWJRs01XatGQ',
    consumer_secret: 'lzXoLOGzxGYeItJ327BGSLcNmZcmPft62x0tHuZYmac',
    access_token_key: '35870660-0250Io0UYm5NHG6QgM7bq7h9aChvA30FIBYV0j1ql',
    access_token_secret: 'RFabG3sgMgg9DlwoWRZrQRIizQZultYvo2Ek9C0Xo'
});

twit.get('/statuses/show/27593302936.json', {include_entities:true}, function (data) {
    //console.log(util.inspect(data));
});
twit.stream('statuses/sample', function(stream) {
    stream.on('data', function(data) {
      data = JSON.stringify(data);
      //console.log(util.inspect(data));
      fs.appendFile('tweets.json', data, function (err, data) {
        if (err) throw err;
        console.log('data is streaming');
      });
    });
});
// twit.search('news OR #news', function (data) {
//   data = JSON.stringify(data);
//   fs.appendFile('tweets.json', data, function (err, data) {
//     if (err) throw err;
//     //console.log('data is ' + JSON.stringify(data));
//   });
// });

    