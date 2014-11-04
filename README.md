# General Sockets

A group of general events for send and receiving json objects through socket.io

---

Basic setup

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
Run the callback when an event is emited from the server

---

###gSocket.announce(listen, data)
Emit data to all sockets

---

###gSocket.bounce(listen, data)
Emit data to this socket

---

###gSocket.send(socketID, listen, data)
Emit data to specific socket

---

###gSocket.broadcast(listen, data)
Emit data to every socket except this one

---

###gSocket.roomAnnounce(roomName, listen, data)
Emit data to room

---

###gSocket.roomBroadcast(roomName, listen, data)
Emit data to everyone in room except you

---

###gSocket.join(roomName)
Join room and emit to this socket

---

###gSocket.leave(roomName)
Leave room and emit to this socket   