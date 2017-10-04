<script type="text/javascript" src="/data/fileManagerData.js"></script>
$(function () {
	//$("#treeview").shieldTreeView({
		//dataSource: dataSrc
	//});
	for (var key in folderData) {
		$(".pb-filemng-template-body").append(
			'<div class=\"col-xs-6 col-sm-6 col-md-3 pb-filemng-body-folders\">' +
			folderData[key].icon + '<br />' +
			'<p class="pb-filemng-paragraphs">' + folderData[key].text + '</p>' +
			'</div>'
		);
	}
})
