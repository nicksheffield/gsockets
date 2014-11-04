//=============================================================================================//
// event                    required params           description                             //
//===========================================================================================//
// gsocket_announce         listen, data              emit to all sockets
// gsocket_bounce           listen, data              emit to this socket
// gsocket_send             socketID, listen, data    emit to specific socket
// gsocket_broadcast        listen, data              emit to every socket except this one
// gsocket_roomAnnounce     roomName, listen, data    emit to room
// gsocket_roomBroadcast    roomName, listen, data    emit to everyone in room except you
// gsocket_join             roomName, listen          join room and emit to this socket
// gsocket_leave            roomName, listen          leave room and emit to this socket     

var gSocket = {
	socket: {},
	connect: function(ip, port){
		ip = ip || location.origin;
		port = port ? ':'+port : '';

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