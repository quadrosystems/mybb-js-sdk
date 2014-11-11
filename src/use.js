var MybbApiSDK = require('./mybb.sdk');

var Api = new MybbApiSDK('http://forum.mybb.ru/');

Api.call('users.get', {
    user_id: 2
}, function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});