

//=============================================================================================//
// event                    required params           description                             //
//===========================================================================================//
// gsockets_announce         event, data              emit to all sockets
// gsockets_bounce           event, data              emit to this socket
// gsockets_send             event, data, socketID    emit to specific socket
// gsockets_broadcast        event, data              emit to every socket except this one
// gsockets_roomAnnounce     event, data, roomName    emit to room
// gsockets_roomBroadcast    event, data, roomName    emit to everyone in room except you
// gsockets_join             event, roomName          join room and emit to this socket
// gsockets_leave            event, roomName          leave room and emit to this socket



module.exports = {
	log: false,
	config: function(obj){
		if(typeof obj.log != undefined) this.log = obj.log;

		return this;
	},
	client: function(req, res, next){

		if(req.url == '/gsockets/client.js'){
			res.sendFile(__dirname + '/client.js');
		}else{
			next();
		}
	},
	listen: function(port){
		var io = require('socket.io')(),
		gs = this;

		io.on('connection', function(socket){
			gs.bind(io, socket);
		});

		io.listen(port);
	},
	bind: function(io, socket){
		socket.emit('connected', {socketID: socket.id});

		var gs = this;

		if(gs.log) console.log(socket.id, '   connect');

		socket.on('gsockets_announce', function(body){
			io.sockets.emit(body.event, body.data);
			if(gs.log) console.log(socket.id, '   announce   ', body)
		});

		socket.on('gsockets_bounce', function(body){
			socket.emit(body.event, body.data);
			if(gs.log) console.log(socket.id, '   bounce   ', body)
		});

		socket.on('gsockets_send', function(body){
			if(gs.log) console.log(socket.id, '   send   ', body)
			if(body.socketID instanceof Array){
				body.socketID.forEach(function(id){
					io.to(id).emit(body.event, body.data);
				});
			}else{
				io.to(body.socketID).emit(body.event, body.data);
			}
		});

		socket.on('gsockets_broadcast', function(body){
			if(gs.log) console.log(socket.id, '   broadcast   ', body)
			socket.broadcast.emit(body.event, body.data);
		});

		socket.on('gsockets_roomAnnounce', function(body){
			if(gs.log) console.log(socket.id, '   roomAnnounce   ', body)
			io.sockets.in(body.roomName).emit(body.event, body.data);
		});

		socket.on('gsockets_roomBroadcast', function(body){
			if(gs.log) console.log(socket.id, '   roomBroadcast   ', body)
			socket.broadcast.to(body.roomName).emit(body.event, body.data);
		});

		socket.on('gsockets_join', function(body){
			if(gs.log) console.log(socket.id, '   join   ', body)
			socket.join(body.roomName);
			socket.emit(body.event, {roomJoined: body.roomName});
		});

		socket.on('gsockets_leave', function(body){
			if(gs.log) console.log(socket.id, '   leave   ', body)
			socket.leave(body.roomName);
			socket.emit(body.event, {roomLeft: body.roomName});
		});

	}

}

	