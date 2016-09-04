

var auth = module.exports = {
    authList: [],
    md5: require("blueimp-md5"),
    secret: 'q1w3e5r7t8y',
    encrypt: function(phone, sms, secret) {
        return auth.md5(phone+sms+secret)
    },
    addList: function(code) {
        auth.authList.push(code);
    },
    clearAuthList: setInterval(function(){
        auth.authList = [];
    },1000*60*30)

};