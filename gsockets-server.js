// ==========================================================================
//      Requires
// ==========================================================================

	var
		express          = require('express'),
		app              = express(),
		server           = require('http').createServer(app),
		io               = require('socket.io').listen(server, {log: false}),
		gsockets         = require('./gsockets/gsockets.js').bind(app);






// ==========================================================================
//      Server
// ==========================================================================

	server.listen(8103);
	console.log('gsockets Server running');







// ==========================================================================
//      Error handler
// ==========================================================================

	process.on('uncaughtException', function (err) { console.log(err) })







// ==========================================================================
//      Express Config
// ==========================================================================

	app.use(express.static(__dirname + '/public'));