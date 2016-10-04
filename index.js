// index.js
var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token,
    retry: Infinity
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}


//controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
//  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
//})

var Slack = require('@slack/client');
var RtmClient = Slack.RtmClient;  
var RTM_EVENTS = Slack.RTM_EVENTS;

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
