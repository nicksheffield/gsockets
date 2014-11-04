var gsockets = {
	socket: {},
	connect: function(ip, port){
		ip = ip || location.origin;
		port = port ? ':' + port : '';

		this.socket = io.connect(ip + port);

		this.socket.on('connected', function(data){
			this.id = data.socketID;
			console.log('Connected: ' + this.id);
		});
	},
	emit: function(event, data){
		this.socket.emit(event, data);
	},
	on: function(event, callback){
		this.socket.on(event, callback);
	},
	announce: function(listen, data){
		this.socket.emit('gsocket_announce', {listen: listen, data: data})
	},
	bounce: function(listen, data){
		this.socket.emit('gsocket_bounce', {listen: listen, data: data})
	},
	send: function(socketID, listen, data){
		this.socket.emit('gsocket_send', {listen: listen, data: data, socketID: socketID})
	},
	broadcast: function(listen, data){
		this.socket.emit('gsocket_broadcast', {listen: listen, data: data})
	},
	roomAnnounce: function(roomName, listen, data){
		this.socket.emit('gsocket_roomAnnounce', {listen: listen, data: data, roomName: roomName})
	},
	roomBroadcast: function(roomName, listen, data){
		this.socket.emit('gsocket_roomBroadcast', {listen: listen, data: data, roomName: roomName})
	},
	join: function(roomName, listen){
		this.socket.emit('gsocket_join', {listen: listen, roomName: roomName})
	},
	leave: function(roomName, listen){
		this.socket.emit('gsocket_leave', {listen: listen, roomName: roomName})
	}
}