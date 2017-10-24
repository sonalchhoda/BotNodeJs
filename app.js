var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId:'d0f03398-4106-4658-a49a-4e201ec2ff95',
    appPassword: '2E4jKhvjdbSihpkPGU8uaqs'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

server.get('/', restify.plugins.serveStatic({  
    directory: __dirname,  
    default: '/index.html'  
   }));  
   
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

  
 
  
  
/*var bot = new builder.UniversalBot(connector, function (session) {  
    var msg = session.message;  
    if (msg.attachments && msg.attachments.length > 0) {  
     // Echo back attachment  
     var attachment = msg.attachments[0];  
        session.send({  
            text: "You sent:",  
            attachments: [  
                {  
                    contentType: attachment.contentType,  
                    contentUrl: attachment.contentUrl,  
                    name: attachment.name  
                }  
            ]  
        });  
    } else {  
        // Echo back users text  
        session.send("You said: %s", session.message.text);  
    }  
});  */