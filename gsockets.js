

//=============================================================================================================//
// event                    required params           color           description                             //
//===========================================================================================================//
// gsockets_announce         event, data              black           emit to all sockets
// gsockets_bounce           event, data              yellow black    emit to this socket
// gsockets_send             event, data, socketID    green           emit to specific socket
// gsockets_broadcast        event, data              blue            emit to every socket except this one
// gsockets_roomAnnounce     event, data, roomName    magenta         emit to room
// gsockets_roomBroadcast    event, data, roomName    cyan            emit to everyone in room except you
// gsockets_join             event, roomName          blue ul         join room and emit to this socket
// gsockets_leave            event, roomName          red ul          leave room and emit to this socket
// gsockets_disconnect                                red             emitted when the user disconnects



module.exports = {
	log: false,
	config: function(obj){
		if(typeof obj.log != undefined) this.log = obj.log;

		return this;
	},
	client: function(req, res, next){

		if(req.url == '/gsockets/client.js'){
			res.sendFile(__dirname + '/client.js');
		}else if(req.url == '/gsockets/client.min.js'){
			res.sendFile(__dirname + '/client.min.js');
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

		var gs     = this,
			colors = require('colors')

		if(gs.log) console.log(socket.id.white.bgBlack, '   connect'.black.bold);

		socket.on('disconnect', function(){
			io.sockets.emit('gsockets_disconnect', {socketID: socket.id});
			if(gs.log) console.log(socket.id.white.bgBlack, '   disconnect'.red)
		})

		socket.on('gsockets_announce', function(body){
			io.sockets.emit(body.event, body.data);
			if(gs.log) console.log(socket.id.white.bgBlack, '   announce        '.magenta, body)
		});

		socket.on('gsockets_bounce', function(body){
			socket.emit(body.event, body.data);
			if(gs.log) console.log(socket.id.white.bgBlack, '   bounce          '.yellow, body)
		});

		socket.on('gsockets_send', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   send            '.green, body)
			if(body.socketID instanceof Array){
				body.socketID.forEach(function(id){
					io.to(id).emit(body.event, body.data);
				});
			}else{
				io.to(body.socketID).emit(body.event, body.data);
			}
		});

		socket.on('gsockets_broadcast', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   broadcast       '.blue, body)
			socket.broadcast.emit(body.event, body.data);
		});

		socket.on('gsockets_roomAnnounce', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   roomAnnounce    '.magenta, body)
			io.sockets.in(body.roomName).emit(body.event, body.data);
		});

		socket.on('gsockets_roomBroadcast', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   roomBroadcast   '.cyan, body)
			socket.broadcast.to(body.roomName).emit(body.event, body.data);
		});

		socket.on('gsockets_join', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   join            '.blue, body)
			socket.join(body.roomName);
			socket.emit(body.event, {roomJoined: body.roomName});
		});

		socket.on('gsockets_leave', function(body){
			if(gs.log) console.log(socket.id.white.bgBlack, '   leave           '.red, body)
			socket.leave(body.roomName);
			socket.emit(body.event, {roomLeft: body.roomName});
		});

	}

}

	