// ==========================================================================
//      Requires
// ==========================================================================

	var
		express          = require('express'),
		app              = express(),
		server           = require('http').createServer(app),
		io               = require('socket.io').listen(server, {log: false})






// ==========================================================================
//      Server
// ==========================================================================

	server.listen(8103);
	console.log('gSockets Server running');







// ==========================================================================
//      Error handler
// ==========================================================================

	process.on('uncaughtException', function (err) { console.log(err) })







// ==========================================================================
//      Express Config
// ==========================================================================

	app.use(express.static(__dirname + '/public'));







// ==========================================================================
//      Sockets
// ==========================================================================



	io.sockets.on('connection', function(socket){

		socket.emit('connected', {socketID: socket.id});

		console.log('Connected: ', socket.id);



		//=============================================================================================//
		// event                    required params           description                             //
		//===========================================================================================//
		// gsocket_announce         listen, data              emit to all sockets
		// gsocket_bounce           listen, data              emit to this socket
		// gsocket_send             listen, data, socketID    emit to specific socket
		// gsocket_broadcast        listen, data              emit to every socket except this one
		// gsocket_roomAnnounce     listen, data, roomName    emit to room
		// gsocket_roomBroadcast    listen, data, roomName    emit to everyone in room except you
		// gsocket_join             listen, roomName          join room and emit to this socket
		// gsocket_leave            listen, roomName          leave room and emit to this socket




		socket.on('gsocket_announce', function(body){
			io.sockets.emit(body.listen, body.data);
		});

		socket.on('gsocket_bounce', function(body){
			socket.emit(body.listen, body.data);
		});

		socket.on('gsocket_send', function(body){
			if(body.socketID instanceof Array){
				body.socketID.forEach(function(id){
					io.to(id).emit(body.listen, body.data);
				});
			}else{
				io.to(body.socketID).emit(body.listen, body.data);
			}
		});

		socket.on('gsocket_broadcast', function(body){
			socket.broadcast.emit(body.listen, body.data);
		});

		socket.on('gsocket_roomAnnounce', function(body){
			io.sockets.in(body.roomName).emit(body.listen, body.data);
		});

		socket.on('gsocket_roomBroadcast', function(body){
			socket.broadcast.to(body.roomName).emit(body.listen, body.data);
		});

		socket.on('gsocket_join', function(body){
			socket.join(body.roomName);
			socket.emit(body.listen, {roomJoined: body.roomName});
		});

		socket.on('gsocket_leave', function(body){
			socket.leave(body.roomName);
			socket.emit(body.listen, {roomLeft: body.roomName});
		});

	});
