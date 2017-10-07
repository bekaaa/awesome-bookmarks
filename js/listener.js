function openPage()
{
	browser.tabs.create(
		{
			active:true,
			url : browser.extension.getURL("/index.html")
		});
}

browser.browserAction.onClicked.addListener(openPage);
