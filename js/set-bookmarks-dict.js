var itemDict = new Map()
var linkIcon = browser.extension.getURL("/icons/link.png");
var folderIcon = browser.extension.getURL("/icons/folder.png");
var bookmarksData = [];


function logTree(bookmarkItems)
{
	var item;
	if(bookmarkItems[0].children)
	{
		//debugger;
		for( let child of bookmarkItems[0].children)
		{
			if( child.title == 'Bookmarks Menu' )
			{
				item = child;
				break;
			}

		}
	}
	// fetch children.
	//var dict = new Map();
	for (child of item.children)
	{
		if (child.url)
		{
			itemDict.set(child.id, [ child.url, child.title, "link" ] );
		}
		else
		{
			itemDict.set(child.id, [ "", child.title, "folder" ] );
		}
	}
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// update bokmarks Data list.
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	for( const item of itemDict.values() )
	{
		// loop through all bookmarks items in shape [ url, title, "link" or "folder" ]
		// set values to the three variables, url, title and icon.
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
		// update the bookmarksData list.
		bookmarksData.push(
		{
			"icon": "<a href=\"" + url + "\" > " +
			"<img class=\"img-responsive\" src=\"" + icon + "\"> </a>",
			"text": title
		});
	}
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// using JQuery update tags for bootstrap to make awsomeness showup.
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	$(function ()
	{
		for ( let item of bookmarksData )
		{
			console.log(item)
			$(".pb-filemng-template-body").append(
				'<div class=\"col-xs-6 col-sm-6 col-md-3 pb-filemng-body-folders\">' +
				item.icon + '<br />' +
				'<p class="pb-filemng-paragraphs">' + item.text + '</p>' + '</div>'
			);
		}
	})
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

}

function onRejected(error)
{
	console.log(`An error: ${error}`);
}

//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var gettingTree = browser.bookmarks.getTree();
gettingTree.then(logTree, onRejected);
