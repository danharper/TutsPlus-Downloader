chrome.extension.sendMessage({}, function(response) {
	var rurl = chrome.extension.getURL('src/inject/jquery.js');
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		function addScript(scriptURL, onload) {
		   var script = document.createElement('script');
		   script.setAttribute("type", "application/javascript");
		   script.setAttribute("src", scriptURL);
		   if (onload) script.onload = onload;
		   document.documentElement.appendChild(script);
		}

		function addSecondScript(){
		    var $courseVideos = $('.section-title a[href]');
		    if ($courseVideos.length) {
		    	$('body').append('<a href="#" id="xext-download-videos" style="display:block;position:fixed;top:0;right:0;color:white;background:#BB3D0B;padding:5px 10px;text-decoration:none;">Download Course Videos</a>');
		    	$(document).on('click', '#xext-download-videos', function(e) {
		    		e.preventDefault();
		    		var links = $.map($courseVideos, function(e) {
		    			return {
		    				title: $(e).text(),
			    			url: $(e).attr('href')
			    		};
			    	});
			    	if (window.confirm(''+$courseVideos.length+' videos found for this course. Download?')) {
				    	chrome.extension.sendMessage({prepareWindow:true, links:links}, function() {
					    	$courseVideos.each(function(e,el) {
								chrome.extension.sendMessage({
									openTab: $(el).attr('href')+'#extDownload'
								});
							});
						});
					}
		    	});
			}

			var $downloadLinks = $('.lesson-meta-wrap .post-buttons a');
			if ($downloadLinks.length && window.location.hash == '#extDownload') {
				$downloadLinks.each(function(e, link) {
					chrome.extension.sendMessage({openTab: $(link).attr('href')});
				});
			}
		}

		addScript(chrome.extension.getURL("src/inject/jquery.js"), addSecondScript);

	}
	}, 10);
});

