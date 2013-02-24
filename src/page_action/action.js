send = function () {
	// chrome.tabs.getSelected(null, function(tab) {
		// chrome.tabs.sendMessage(tab.id, {}, function() {
		chrome.extension.sendMessage({}, function() {
			var readyStateCheckInterval = setInterval(function() {
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);

				// ----------------------------------------------------------
				// This part of the script triggers when page is done loading
				window.console.log('omg', document);
				// ----------------------------------------------------------

			}
			}, 10);
		});
		// window.close();
	// });
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').onclick = send;
});
