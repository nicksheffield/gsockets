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
<script src="/assets/js/gsockets-client.js"></script>
<script>
	gSocket.connect();

	gSocket.announce('user_connected');

	gSocket.on('user_connected', function(){
		console.log('A user has connected');
	})
</script>
```

---

###gSocket.connect(ip, port)
**ip** (optional) The ip of the server if different from the current page

**port** (optional) The port of the server

Create the connection to the socket.io server

---

###gSocket.emit(event, data)
**event** The name of the event for the server to respond to

**data** (optional) JSON object containing data

Send an ordinary socket.io event

---

###gSocket.on(event, callback)
**event** The name of the event to listen for

**callback** The function to run when this event is fired

Run the callback when an event is emited from the server

---

###gSocket.announce(listen, data)
**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to all sockets

---

###gSocket.bounce(listen, data)
**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to this socket

---

###gSocket.send(socketID, listen, data)
**socketID** The socket id to send this data to

**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to specific socket

---

###gSocket.broadcast(listen, data)
**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to every socket except this one

---

###gSocket.roomAnnounce(roomName, listen, data)
**roomName** The name of the room to emit to

**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to room

---

###gSocket.roomBroadcast(roomName, listen, data)
**roomName** The name of the room to emit to

**listen** The name of the event that will be sent to another client

**data** (optional) JSON object containing data

Emit to everyone in room except you

---

###gSocket.join(roomName, listen)
**roomName** The name of the room to join

**listen** The name of the event that will be sent to another client

Join room and emit to this socket

---

###gSocket.leave(roomName, listen)
**roomName** The name of the room to leave

**listen** The name of the event that will be sent to another client

Leave room and emit to this socket