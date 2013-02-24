(function() {

	var addScript = function (scriptURL, onload) {
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.setAttribute("src", scriptURL);
		if (onload) script.onload = onload;
		document.documentElement.appendChild(script);
	};

	// On a Course page, add button to auto download each course video
	var findCourseVideos = function (){
		var courseVideos = $('.section-title a[href]');
		if (courseVideos.length) {
			chrome.extension.sendMessage({ prepareQueue:true });

			$('body').append('<a href="#" id="xext-download-videos" style="display:block;position:fixed;top:0;right:0;color:white;background:#BB3D0B;padding:5px 10px;text-decoration:none;">Download Course Videos</a>');

			$(document).on('click', '#xext-download-videos', function(e) {
				e.preventDefault();
				var links = $.map(courseVideos, function(e) { return {
						title: $(e).text(),
						url: $(e).attr('href')
				}; });

				var confirm = window.confirm(''+courseVideos.length+' videos found for this course. Download?');

				if (confirm) {
					chrome.extension.sendMessage({
						prepareWindow: true,
						links: links
					}, function() {
						courseVideos.each(function(e,el) {
							chrome.extension.sendMessage({
								openTab: $(el).attr('href')+'#extDownload'
							});
						});
					});
				}
			});
		}
	};

	// On a video page, auto-download the video (and project files) if URL has #extDownload
	var findDownloads = function() {
		if (window.location.hash == '#extDownload') {
			$('.lesson-meta-wrap .post-buttons a').each(function(e, link) {
				chrome.extension.sendMessage({
					download: $(link).attr('href')
				});
			});
		}
	};

	var run = function() {
		findCourseVideos();
		findDownloads();
	};

	var bootstrapExtension = function() {
		// finding the download files relies on jQuery
		addScript(chrome.extension.getURL("src/inject/jquery.js"), run);
	};

	chrome.extension.sendMessage({}, function(response) {
		var readyInterval = setInterval(function() {
			if (document.readyState === "complete") {
				clearInterval(readyInterval);
				bootstrapExtension();
			}
		}, 10);
	});

})();
