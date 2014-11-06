# General Sockets

A group of general events for sending and receiving json objects through socket.io

##Setup

__NPM__

```
$ npm install gsockets
```

__Server__

Assume `io` is your socket.io object, and `app` is your express server

```javascript
var gsockets = require('gsockets');

// to enable debug logs, add this line
gsockets.config({ debug: true});

// express middleware to host the client.js file at /gsockets/client.js
app.use(gsockets.client);

io.on('connect', function(socket){
	gsockets.bind(io, socket);
});
```

__Client__

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/gsockets/client.js"></script>
<script>
	gsockets.connect();

	gsockets.announce('user_connected');

	gsockets.on('user_connected', function(){
		console.log('A user has connected');
	});
</script>
```


##Server API

####`gsockets.client(req, res, next)`

Serve the client.js file at the /gsockets/client.js url

 * usage: `app.use(gsockets.client);`



####`gsockets.config(obj)`

Modify configuration settings of gsockets. The only option currently available is debug.

 * usage: `gsockets.config({ debug: true});`



####`gsockets.bind(io, socket)`

Add the gsockets events to your socket.io server



##Client API



####`gsockets.connect(ip, port)`

Create the connection to the socket.io server
 
 * _ip_ (optional) The ip of the server if different from the current page
 * _port_ (optional) The port of the server



####`gsockets.emit(event, [data])`

Send an ordinary socket.io event

 * _event_ The name of the event for the server to respond to
 * _data_ (optional) Data object



####`gsockets.on(event, callback)`

Run the callback when an event is emited from the server

 * _event_ The name of the event to listen for
 * _callback_ The function to run when this event is fired



####`gsockets.announce(event, [data])`

Emit event to all sockets

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.bounce(event, [data])`

Emit event to this socket

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.send(socketID, event, [data])`

Emit event to specific socket

 * _socketID_ The socket id to send this data to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.broadcast(event, [data])`

Emit event to every socket except this one

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.roomAnnounce(roomName, event, [data])`

Emit event to room

 * _roomName_ The name of the room to emit to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.roomBroadcast(roomName, event, [data])`

Emit event to everyone in room except you

 * _roomName_ The name of the room to emit to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



####`gsockets.join(roomName, event)`

Join room and emit an event to this socket

 * _roomName_ The name of the room to join
 * _event_ The name of the event that will be sent to another client



####`gsockets.leave(roomName, event)`

Leave room and emit an event to this socket

 * _roomName_ The name of the room to leave
 * _event_ The name of the event that will be sent to another client