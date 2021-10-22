var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 8080,host: "192.168.21.93",});
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
});