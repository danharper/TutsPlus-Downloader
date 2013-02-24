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
		    // addScript(chrome.extension.getURL("src/inject/second.js"));
		    var $courseVideos = $('.section-title a[href]');
		    if ($courseVideos.length) {
		    	var go = window.confirm(''+$courseVideos.length+' videos found for this course. Download?');
		    	if (go) {
			    	chrome.extension.sendMessage({prepareWindow:true}, function() {
				    	$courseVideos.each(function(e,el) {
							chrome.extension.sendMessage({
								// openTab: $(el).attr('href')
							});
						});
					});
				}
			}

			var $downloadLinks = $('.lesson-meta-wrap .post-buttons a');
			if ($downloadLinks.length) {
				$downloadLinks.each(function(e, link) {
					// chrome.extension.sendMessage({openTab: $(link).attr('href')});
				});
				chrome.extension.sendMessage({closeMe: true});
			}
		}

		addScript(chrome.extension.getURL("src/inject/jquery.js"), addSecondScript);

	}
	}, 10);
});

