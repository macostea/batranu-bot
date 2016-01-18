var Slack = require('slack-client');
var token = process.env.SLACK_TOKEN;
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

var wisdom = ["szomorú sors", "haaaat", "asta-mi place", "excellent", "nu am nici o parere", "When one of us goes to war, we all go to war", "In a fight anger is as good as courage", "The best revenge is a massive success", "The strong did what they could and the weak suffered what they must", "Though... I walk through the valley of shadows of death I fear no one, for I am the meanest motherfucker in the whole valley",
"Few men are born brave, many become so through training and force of discipline", "War gives the right of the conquerors to impose any condition they please upon the vanquished", "Valour is superior to numbers", "Don’t say that you’re the best. Be the best", "A good general not only sees the way to victory, he also knows when victory is impossible",
"Always do an excellent job no matter how irrelevant the assignment might look. Give others time to fail. At the end it will be obvious who was right", "A general is not easily overcome who can form a true judgement of his own and the enemy's forces", "He who knows when he can fight and when he cannot will be victorious.",
"Sometimes patience is the key. Don’t rush things... give them time and they might happen the way you want them to happen", "To lead untrained people to war is to throw them away", "In the moment of action remember the value of silence and order", "Willing obedience always beats forced obedience",
"I am more afraid of our own mistakes than of our enemies' designs", "Against danger it pays to be prepared", "Let them hate us, as long as they fear us", "The best fortress which a prince can possess is the affection of his people", "A dead enemy always smells good", "The wise man speaks because he has something to say, the fool because he has to say something",
"All warfare is based on deception", "The god of war hates those who hesitate", "Pardon one offence and you encourage the commission of many", "A disorderly mob is no more an army than a heap of building materials is a house", "Better to reign in hell than serve in heav'n", "It is not titles that honour men, but men that honour titles",
"It is the brave man's part to live with glory, or with glory die", "Necessity knows no law except to conquer", "Learn to obey before you command", "It is better to live one day as a lion than a hundred years as a sheep", "Pain is weakness leaving your body", "Good order makes men bold, and confusion, cowards", "Treat your men as you would your own beloved sons. And they will follow you into the deepest valley"];

slack.on('open', function() {
    var channels = [];
    var groups = [];
    var unreads = slack.getUnreadCount();

    for (var i in slack.channels) {
        var channel = slack.channels[i];
        if (channel.is_member) {
            channels.push("#" + channel.name);
        }
    }
    for (var i in slack.groups) {
        var group = slack.groups[i];
        if (group.is_open && !group.is_archived) {
            groups.push(group.name);
        }
    }
    console.log("Welcome to Slack. You are @#{slack.self.name} of #{slack.team.name}");
    console.log('You are in: ' + channels.join(', '));
    console.log('As well as: ' + groups.join(', '));
});

slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var channelType = channel.getType();
    var user = slack.getUserByID(message.user);

    var channelName = channel.isChannel ? '#' : '';
    channelName = channelName + channel.name;
    console.log(message);
    console.log(channel);
    console.log(user);
    console.log(channelType);

    var mention = -1;
    mention = message.text.indexOf('<@U052266EC>');
    if (mention != -1) {
        console.log("It's for batranu!");

        var randomWisdomNumber = Math.floor((Math.random() * wisdom.length));
        if (randomWisdomNumber < 0) {
            randomWisdomNumber = 0;
        }
        if (randomWisdomNumber >= wisdom.length) {
            randomWisdomNumber = wisdom.length-1;
        }
        channel.send(wisdom[randomWisdomNumber]);
    }
});

slack.login();
