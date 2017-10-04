function openPage()
{
	browser.tabs.create(
		{
			active:true,
			url : "/index.html"
		});
}



browser.browserAction.onClicked.addListener(openPage);
