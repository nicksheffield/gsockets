# General Sockets

A group of general events for sending and receiving json objects through socket.io

---

Basic setup

__Server__

```javascript
// express middleware to host the client.js file at /gsockets/client.js
app.middleware(gsockets.client);

// io is your socket.io object.
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
	})
</script>
```

---

###gsockets.connect(ip, port)
**ip** (optional) The ip of the server if different from the current page

**port** (optional) The port of the server

Create the connection to the socket.io server

---

###gsockets.emit(event, [data])
**event** The name of the event for the server to respond to

**data** (optional) JSON object containing data

Send an ordinary socket.io event

---

###gsockets.on(event, callback)
**event** The name of the event to listen for

**callback** The function to run when this event is fired

Run the callback when an event is emited from the server

---

###gsockets.announce(event, [data])
**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to all sockets

---

###gsockets.bounce(event, [data])
**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to this socket

---

###gsockets.send(socketID, event, [data])
**socketID** The socket id to send this data to

**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to specific socket

---

###gsockets.broadcast(event, [data])
**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to every socket except this one

---

###gsockets.roomAnnounce(roomName, event, [data])
**roomName** The name of the room to emit to

**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to room

---

###gsockets.roomBroadcast(roomName, event, [data])
**roomName** The name of the room to emit to

**event** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to everyone in room except you

---

###gsockets.join(roomName, event)
**roomName** The name of the room to join

**event** The name of the event that will be sent to another client

Join room and emit to this socket

---

###gsockets.leave(roomName, event)
**roomName** The name of the room to leave

**event** The name of the event that will be sent to another client

Leave room and emit to this socket