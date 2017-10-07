var linkIcon = browser.extension.getURL("/icons/link.png");
var folderIcon = browser.extension.getURL("/icons/folder.png");
//var bookmarksData = [];
//var itemDict = new Map();

function getRoot(bookmarkItems)
{
	if(bookmarkItems[0].children)
	{
		for( let child of bookmarkItems[0].children)
		{
			if( child.title == 'Bookmarks Menu' )
			{
				var parent = child;
				break;
			}

		}
	}
	logTree(parent);
}
function getParent(parentID)
{
	let parent = browser.bookmarks.getSubTree(parentID);
	//debugger;
	parent.then(function(b){logTree(b[0]);}, onRejected);
}


function logTree(parent)
{
	//remove all current items if there is
	$(".pb-filemng-template-body").empty();
	// define two important containers.
	var bookmarksData = [];
	var itemDict = new Map();
	debugger;
	// get children.
	for ( let child of parent.children )
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
	for( let entry of itemDict.entries() )
	{
		// loop through all bookmarks items in shape [id],[ url, title, "link" or "folder" ]
		// set values to the three variables, url, title and icon.
		let iid = entry[0];
		let iurl = entry[1][0];
		let ititle = entry[1][1];
		let itype  = entry[1][2];

		let id;
		let url;
		let title;
		let icon;

		if( itype == "link" )
		{
			icon = linkIcon;
			url = iurl;
			id  = "";
			if( ititle == "" )
			{
				title = iurl;
			}
			else
			{
				title = ititle;
			}
		}
		else
		{
			icon = folderIcon;
			title = ititle;
			url = "";
			id = iid
		}
		// update the bookmarksData list.
		bookmarksData.push(
		{
			"icon":
			"<span class=\"glyphicon glyphicon-folder-open\"></span>",
			"title": title,
			"url": url,
			"id": id
		});
	}
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// using JQuery update tags for bootstrap to make awsomeness showup.
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	$(function ()
	{
		for ( var item of bookmarksData )
		{
			if( item.id == "" )
			{
				var link = "href=\"" + item.url + "\"";
			}
			else
			{
				var link = "id=\"" + item.id + "\"";

			}

			var div = $(".pb-filemng-template-body").append(
				"<a " + link + " > " +
				'<div class=\"col-xs-6 col-sm-6 col-md-6 pb-filemng-body-folders\">' +
				item.icon +
				'<p class="pb-filemng-paragraphs">' + item.title + '</p></a>' + '</div>'
			);
			//debugger;
			if( item.id != "" )
			{
				//debugger;
				//getParent(item.id)
				//document.getElementById(item.id).addEventListener("click", function()
				//{
				//	console.log("hello");
					//getParent(item.id);
				//}, onRejected);
/*
				div.promise().done(function()
				{
					console.log("done");
					$( "#" + item.id  ).click(function()
					{
						console.log("hello");
						debugger;
						getParent(item.id);
						return false;
					});
				});*/
			}
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
gettingTree.then(getRoot, onRejected);
