gsockets.connect(location.origin);

$('#form').on('submit', function(e){
	e.preventDefault();

	gsockets.announce('message', {text: $('#input').val()});
})

gsockets.on('message', function(data){
	$('.messages').append('<p>'+data.text+'</p>');
	$('#input').val('');
})