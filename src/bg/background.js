var preparedWindow;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	// chrome.pageAction.show(sender.tab.id);

	if (request.prepareWindow) {
		chrome.windows.create({width:50, height:200, url:'src/resulting/downloading.html?data='+JSON.stringify(request.links)}, function(win) {
			preparedWindow = win;
		});
	}

	if (request.openTab) {
		var opts = {
			url: request.openTab,
			active: false
		};

		if (preparedWindow) opts.windowId = preparedWindow.id;

		chrome.tabs.create(opts);
	}

	sendResponse();
});
