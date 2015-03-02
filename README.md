# Generic Socket Events

A set of generic events for sending and receiving json objects through socket.io.

Allows you to easily announce, broadcast and directly send data to other sockets, and also join/leave rooms through a basic client-side API.

## Setup

### NPM

```
$ npm install gsockets
```

### Server

```javascript
var gsockets = require('gsockets');

// to enable debug logs, add this line
gsockets.config({ log: true});

// express middleware to host the client.js file at /gsockets/client.js
app.use(gsockets.client);
```

_Using existing Socket.IO_

```javascript
io.on('connect', function(socket){
	gsockets.bind(io, socket);
});
```

_Using standalone mode_

```javascript
// choose whatever port number you want to use
gsockets.listen(1234);
```

### Client

```html
<script src="https://cdn.socket.io/socket.io-1.0.6.js"></script>
<script src="/gsockets/client.js"></script>
<script>
	gsockets.connect();

	gsockets.broadcast('user_connected');

	gsockets.on('user_connected', function(){
		console.log('A user has connected');
	});
</script>
```


## Server API

#### `gsockets.client(req, res, next)`

Serve the client.js file at the url `/gsockets/client.js`

 * usage: `app.use(gsockets.client);`



#### `gsockets.config(obj)`

Modify configuration settings of gsockets. The only option currently available is log.

 * usage: `gsockets.config({ log: true});`



#### `gsockets.bind(io, socket)`

Add the gsockets events to your socket.io server



#### `gsockets.listen(port)`

Create a separate instance of socket.io especially to run gsockets.



## Client API



#### `gsockets.connect([ip], [port])`

Create the connection to the socket.io server
 
 * _ip_ (optional) The ip of the server if different from the current page
 * _port_ (optional) The port of the server



#### `gsockets.socket`

The orginal socket.io object.

 * usage: `var socketID = gsockets.socket.id;`



#### `gsockets.on(event, callback)`

Run the callback when an event is emited from the server

 * _event_ The name of the event to listen for
 * _callback_ The function to run when this event is fired



#### `gsockets.onDisconnect(callback)`

Run the callback when a socket disconnects

 * _callback_ The function to run when this event is fired



#### `gsockets.announce(event, [data])`

Emit event to all sockets

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.bounce(event, [data])`

Emit event to this socket

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.send(socketID, event, [data])`

Emit event to specific socket

 * _socketID_ The socket id to send this data to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.broadcast(event, [data])`

Emit event to every socket except this one

 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.roomAnnounce(roomName, event, [data])`

Emit event to room

 * _roomName_ The name of the room to emit to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.roomBroadcast(roomName, event, [data])`

Emit event to everyone in room except you

 * _roomName_ The name of the room to emit to
 * _event_ The name of the event that will be sent to another client
 * _data_ (optional) Data object



#### `gsockets.join(roomName, event)`

Join room and emit an event to this socket

 * _roomName_ The name of the room to join
 * _event_ The name of the event that will be sent to another client



#### `gsockets.leave(roomName, event)`

Leave room and emit an event to this socket

 * _roomName_ The name of the room to leave
 * _event_ The name of the event that will be sent to another client