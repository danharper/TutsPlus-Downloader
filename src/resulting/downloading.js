$(function() {
	var data = JSON.parse(decodeURIComponent(window.location.search.split('?data=')[1]));
	$.each(data, function(i, link) {
		$('ul').append('<li><a href="'+link.url+'">'+link.title+'</a>');
	});
});
