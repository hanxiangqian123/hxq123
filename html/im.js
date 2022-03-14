var WebSocket = require('ws');
<<<<<<< HEAD
var wss = new WebSocket.Server({port: 8080,host: "192.168.21.93",});
=======
var wss = new WebSocket.Server({port: 8083,host: "192.168.21.93",});
>>>>>>> b111720... '111'
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      console.log(message)
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
    });
    ws.send('something');
<<<<<<< HEAD
});
=======
});
console.log('ed')
>>>>>>> b111720... '111'
