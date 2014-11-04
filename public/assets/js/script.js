gSocket.connect(location.origin);

$('#form').on('submit', function(e){
	e.preventDefault();

	gSocket.announce('message', {text: $('#input').val()});
})

gSocket.on('message', function(data){
	$('.messages').append('<p>'+data.text+'</p>');
	$('#input').val('');
})