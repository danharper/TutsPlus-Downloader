var preparedWindow;

var DownloadQueue = function() {
	this.queue = [];
	this.listening = false;
	this.startListening();
};

DownloadQueue.prototype.addOne = function(url) {
	console.log('Queuing...', url);
	this.queue.push(url);
	this.monitor();
};

DownloadQueue.prototype.monitor = _.throttle(function() {
	var self = this;
	this.getActive(function(activeDownloads) {
		console.log('Active Downloads...', activeDownloads);
		if (activeDownloads < 2) {
			self.download();
		}
	});
}, 600);

DownloadQueue.prototype.getActive = function(callback) {
	chrome.downloads.search({ state: "in_progress" }, function(results) {
		callback(results.length);
	});
};

DownloadQueue.prototype.download = function() {
	if (this.queue.length) {
		console.log('Downloading...', this.queue[0]);
		chrome.downloads.download({
			url: this.queue.shift(0)
		});
	}
	else {
		this.stopListening();
	}
};

DownloadQueue.prototype.startListening = _.throttle(function() {
	if (this.listening) return;
	console.log('ADDING LISTENER');
	var self = this;
	chrome.downloads.onChanged.addListener(function() {
		self.monitor();
	});
	this.listening = true;
}, 200);

DownloadQueue.prototype.stopListening = _.throttle(function() {
	if ( ! this.listening) return;
	console.log('REMOVING LISTENER');
	var self = this;
	chrome.downloads.onChanged.removeListener(function() {
		self.monitor();
	});
	this.listening = false;
}, 200);

var dQ;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.pageAction.show(sender.tab.id);

	if (request.prepareQueue) {
		dQ = new DownloadQueue();
	}

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

	if (request.download) {
		dQ.addOne(request.download);
	}

	sendResponse();
});
