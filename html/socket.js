var express = require("express")
var app = express()
var expressWs = require("express-ws");
expressWs(app);  //将 express 实例上绑定 websock 的一些方法
const map = new Map();
const WebSocket = require('ws');

const wss = new WebSocket.Server({
	port: 8080
});

function getCookies(cookies) {
	var obj = {}
	var a = cookies.split(";")
	a.map((val) => {
		var o = val.split("=")
		obj[o[0].trim()] = o[1].trim()

	})
	return obj
}
wss.on('connection', function connection(ws, request) {

	var cookies = getCookies(request.headers.cookie)
	if (cookies.token) {
		map.set(cookies.token, ws);
	}
	console.log(`${cookies.token}已上线`);
	// console.log(map.size);
	// wss.clients.forEach((val) => {
	// 	console.log(val.readyState);
	// })
	ws.on('message', function incoming(data) {
		console.log(data);
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
	ws.on("close", function () {
		map.delete(cookies.token)
		console.log(`${cookies.token}已下线`);
		ws.send(`${cookies.token}已下线`)
	})
});


module.exports = wss