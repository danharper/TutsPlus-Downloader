// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
var preparedWindow;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
  	if (request.prepareWindow) {
  		chrome.windows.create({width:50, height:200, url:'src/resulting/downloading.html'}, function(win) {
  			preparedWindow = win;
  		});
  	}
  	if (request.openTab) {
  		chrome.tabs.create({
  			url: request.openTab,
  			active: false,
  			windowId: preparedWindow.id
  		});
  	}
  	if (request.closeMe) {
  		chrome.tabs.remove(sender.tab.id);
  	}
    sendResponse();
  }
);
