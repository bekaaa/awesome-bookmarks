var PARENT
var ROOT
var TRACKER = []
function logRoot(bookmarkItems)
{
	PARENT = bookmarkItems[0].children.find(function(child)
	{
		return child.title == "Bookmarks Menu";
	});
	ROOT = PARENT;
	TRACKER = [];
	TRACKER.push(PARENT);
	logTree();
}
//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function logNode(parentID)
{
	let parent = PARENT.children.find(function(child)
	{
		return child.id == parentID;
	});
	if (parent)
	{
		PARENT = parent;
		TRACKER.push(PARENT)
		logTree();
	}
	else { onRejected("No nodes with id " + parentID); }
}
//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function goBack()
{
	if(!PARENT) { return; }
	if( PARENT.parentId == "root________" ) { return; }
	if(TRACKER == [] || TRACKER == [ROOT] ) { return; }

	TRACKER.pop();
	PARENT = TRACKER[TRACKER.length - 1];
	logTree();


}
//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function logTree()
{
	//remove all current items if there is
	$(".pb-filemng-template-body").empty();
	$('.currentNode').empty();
	$(".currentNode").append('<p class="title">' + PARENT.title + '</p>');

	// define two important containers.
	var bookmarksData = [];
	//debugger;
	// get children.
	for ( let child of PARENT.children )
	{
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// update bokmarks Data list.
	//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
		let id;
		let url;
		let title;
		let link;
		let icon;
		let textColor;

		if( child.url ) // if a link.
		{
			url = child.url;
			id  = "";
			link = "href=\"" + url + "\" target=\"_blank\"";
			if( child.title == "" ) { title = url; }
			else { title = child.title; }
			icon = "<span class=\"glyphicon glyphicon-link\"></span>";
			textColor = 'style=\"color:red;\"';
		}
		else // if a folder.
		{
			title = child.title;
			url = "";
			id = child.id
			link = "id=\"" + id + "\"";
			icon = "<span class=\"glyphicon glyphicon-folder-open\"></span>";
			textColor = 'style=\"color:blue;\"';
		}

		$(".pb-filemng-template-body").append( "<a " + link + " > " +
			'<div class=\"col-xs-6 col-sm-6 col-md-6 pb-filemng-body-folders \">' + icon +
			'<p class="pb-filemng-paragraphs" '+ textColor +'>' +
			title + '</p> </div> </a>'
		);

		$( "#" + id  ).click(function()
		{
			logNode(id);
		});

	}
}


function onRejected(error)
{
	console.log(`An error: ${error}`);
}

//-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
var gettingTree = browser.bookmarks.getTree();
gettingTree.then(logRoot, onRejected);

$( ".glyphicon-menu-left" ).click(function()
{
	goBack();
});
