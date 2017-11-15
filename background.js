/*
  Show the button for the current tab
*/
var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
  showButton(tabs[0].id);
});

/*
  Make sure the reload button is shown when active tab changes
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  showButton(activeInfo.tabId);
});

/*
Restart alarm for the currently active tab, whenever the user navigates.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return;
  }
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    if (tabId == tabs[0].id) {
      showButton(tabs[0].id);
    }
  });
});

/*
  showButton: show the reload button for the active tab
*/
function showButton(tabId) {
  browser.pageAction.show(tabId);
}

/*
  On page action click, reload the active tab.
*/
browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.reload();
});

