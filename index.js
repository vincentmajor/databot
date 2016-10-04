// index.js
var Slack = require('@slack/client');
var RtmClient = Slack.RtmClient;  
var RTM_EVENTS = Slack.RTM_EVENTS;

var token = process.env.API_TOKEN;

//var str = "The best things in Data are free";
//var patt = new RegExp("data", 'i');
//var res = patt.test(str);

var rtm = new RtmClient(token, { logLevel: 'info' });  
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function(message) {  
  var channel = message.channel;
  var text = message.text;
  var pattern = new RegExp("data", 'i'); //i flag for case insensitive
  var result = pattern.test(text);
  // if result == true sendMessage of data
  if (result == true) {
      rtm.sendMessage("Did someone say *data*?", channel);
      //rtm.sendMessage('*bold*', channel);
  }
});