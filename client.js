var gsockets = {
	socket: {},
	connect: function(ip, port){
		ip = ip || location.origin;
		port = port ? ':' + port : '';

		this.socket = io.connect(ip + port);

		this.socket.on('connected', function(data){
			this.id = data.socketID;
			console.log('gsockets id: ' + this.id);
		});
	},
	on: function(event, callback){
		this.socket.on(event, callback);
	},
	onDisconnect: function(callback){
		this.socket.on('gsockets_disconnect', callback);
	},
	announce: function(event, data){
		this.socket.emit('gsockets_announce', {'event': event, 'data': data})
	},
	bounce: function(event, data){
		this.socket.emit('gsockets_bounce', {'event': event, 'data': data})
	},
	send: function(socketID, event, data){
		this.socket.emit('gsockets_send', {'event': event, 'data': data, 'socketID': socketID})
	},
	broadcast: function(event, data){
		this.socket.emit('gsockets_broadcast', {'event': event, 'data': data})
	},
	roomAnnounce: function(roomName, event, data){
		this.socket.emit('gsockets_roomAnnounce', {'event': event, 'data': data, 'roomName': roomName})
	},
	roomBroadcast: function(roomName, event, data){
		this.socket.emit('gsockets_roomBroadcast', {'event': event, 'data': data, 'roomName': roomName})
	},
	join: function(roomName, event){
		this.socket.emit('gsockets_join', {'event': event, 'roomName': roomName})
	},
	leave: function(roomName, event){
		this.socket.emit('gsockets_leave', {'event': event, 'roomName': roomName})
	}
}