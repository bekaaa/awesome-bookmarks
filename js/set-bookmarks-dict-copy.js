var itemDict
function fetchChildren(item)
{
	var dict = new Map();
	for (child of item.children)
	{
		if (child.url)
		{
			dict.set(child.id, [ child.url, child.title, "link" ] );
		}
		else
		{
			dict.set(child.id, [ "", child.title, "folder" ] );
		}
	}
	return dict
}

function logTree(bookmarkItems)
{
	if(bookmarkItems[0].children)
	{
		for(child in bookmarkItems[0].children)
		{
			if( child.title == 'Bookmarks Menu')
			{
				item = child;
				break;
			}
		}
	}
	itemDict =  fetchChildren(item);

}

function onRejected(error)
{
	console.log(`An error: ${error}`);
}

//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var gettingTree = browser.bookmarks.getTree();
var itemDict = gettingTree.then(logTree, onRejected);
//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var linkIcon = browser.extension.getURL("/icons/link.png");
var folderIcon = browser.extension.getURL("/icons/folder.png");
var bookmarksData = [];
//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
console.log(itemDict)
for( const item of itemDict.values() )
{
	if( item[2] == "link" )
	{
		icon = linkIcon;
		url = item[0];
		if( item[1] == "" )
		{
			title = item[0];
		}
		else
		{
			title = item[1];
		}
	}
	else
	{
		icon = folderIcon;
		title = item[1];
		url = "";
	}

	var obj =
	{
		"icon": "<a href=\"" + url + "\" > " +
			"<img class=\"img-responsive\" src=\"" + icon + "\"> </a>",
		"text": title
	}

	bookmarksData.push(obj);
}
