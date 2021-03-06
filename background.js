var button = {
  'active': false,
  'status': null,
  'hits':   null
};

chrome.webRequest.onHeadersReceived.addListener(function (details) {
  if (details.type === 'main_frame') {
    var headers = details.responseHeaders;
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header.name === 'Via' && header.value.indexOf('varnish')) {
        button.active = true;
      }
      if (header.name === 'X-Cache') {
        if (header.value.indexOf('HIT') !== -1) {
            button.status = 'hit';
        } else if (header.value.indexOf('MISS') !== -1) {
            button.status = 'miss';
        }
      }
      button.hits = (header.name === 'X-Cache-Hits') ? parseInt(header.value, 10) : null;
    }
  }
}, {
  urls: [
    "http://*/*",
    "https://*/*"
  ]
}, [ 'responseHeaders' ]);

chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId === 0) {
    var color = (button.active) ? 'blue' : 'gray';
    switch (button.status) {
      case 'hit':
        color = 'green';
        chrome.browserAction.setBadgeBackgroundColor({
          color: [0, 160, 0, 200],
          tabId: details.tabId
        });
        chrome.browserAction.setBadgeText({
          text: button.hits.toString(),
          tabId: details.tabId
        });
        break;
      case 'miss':
        color = 'red';
        chrome.browserAction.setBadgeText({
          text: 'MISS',
          tabId: details.tabId
        });
        break;
    }
    chrome.browserAction.setIcon({
      path: 'img/button_' + color + '.png',
      tabId: details.tabId
    });
  }
});
