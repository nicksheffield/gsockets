module.exports = {
	bind: function(express){

		express.get('/gsockets/client.js', function(req, res){
			res.sendFile(__dirname + '/client.js');
		})

		var io = require('socket.io').listen(server, {log: false}),

		io.sockets.on('connection', function(socket){

			socket.emit('connected', {socketID: socket.id});

			console.log('Connected: ', socket.id);



			//=============================================================================================//
			// event                    required params           description                             //
			//===========================================================================================//
			// gsockets_announce         listen, data              emit to all sockets
			// gsockets_bounce           listen, data              emit to this socket
			// gsockets_send             listen, data, socketID    emit to specific socket
			// gsockets_broadcast        listen, data              emit to every socket except this one
			// gsockets_roomAnnounce     listen, data, roomName    emit to room
			// gsockets_roomBroadcast    listen, data, roomName    emit to everyone in room except you
			// gsockets_join             listen, roomName          join room and emit to this socket
			// gsockets_leave            listen, roomName          leave room and emit to this socket




			socket.on('gsockets_announce', function(body){
				io.sockets.emit(body.listen, body.data);
			});

			socket.on('gsockets_bounce', function(body){
				socket.emit(body.listen, body.data);
			});

			socket.on('gsockets_send', function(body){
				if(body.socketID instanceof Array){
					body.socketID.forEach(function(id){
						io.to(id).emit(body.listen, body.data);
					});
				}else{
					io.to(body.socketID).emit(body.listen, body.data);
				}
			});

			socket.on('gsockets_broadcast', function(body){
				socket.broadcast.emit(body.listen, body.data);
			});

			socket.on('gsockets_roomAnnounce', function(body){
				io.sockets.in(body.roomName).emit(body.listen, body.data);
			});

			socket.on('gsockets_roomBroadcast', function(body){
				socket.broadcast.to(body.roomName).emit(body.listen, body.data);
			});

			socket.on('gsockets_join', function(body){
				socket.join(body.roomName);
				socket.emit(body.listen, {roomJoined: body.roomName});
			});

			socket.on('gsockets_leave', function(body){
				socket.leave(body.roomName);
				socket.emit(body.listen, {roomLeft: body.roomName});
			});

		});

	}
}

	