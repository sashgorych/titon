function addImage(src) {
	var newImg = document.createElement("img");
	$(newImg).css({
		"margin": "5px",
		"border": "solid 1px darkgray"
	});

	if ($("#thumbnails-"+color).length == 0)
		$("#container").after('<div id="thumbnails-'+color+'" class="thumbnails"></div>');
	$("#thumbnails-"+color).append(newImg).css("border-left","solid 6px #"+color).
                           append('<a href="" title="сделать первой" class="plupload_mk_first" color="'+color+'" index="'+icnt+'">[-]</a>');

	$(newImg).fadeTo(0,0);

	$(newImg).bind("load",function() {
		$(this).fadeTo(0,1);
	}).attr("src",src).attr({
		"title":"double click to remove",
		"index": icnt++
	}).hover(function () {$(this).fadeTo(100,0.7);},function () {$(this).fadeTo(100,1);});
}

var uploader;
var upload_state = false;

$(document).ready(function() {

		uploader = new plupload.Uploader({
		runtimes : 'gears,html5,flash,silverlight,browserplus',
		browse_button : 'pickfiles',
		container: 'container',
		max_file_size : '2mb',
		url : 'admin.php?page=ajax_upload&command=img_upload',
		resize : {width : 1000, height : 1000, quality : 65},
		flash_swf_url : '/js/plupload/plupload.flash.swf',
		silverlight_xap_url : '/js/plupload/plupload.silverlight.xap',
		filters : [
			{title : "JPG files", extensions : "jpg"},
			{title : "JPEG files", extensions : "jpeg"},
			{title : "PNG files", extensions : "png"},
			{title : "GIF files", extensions : "gif"}
		],
		multipart_params: {}
	});

	uploader.bind('Init', function(up, params) {
//		$('#filelist').html("<div>Current runtime: " + params.runtime + "</div>");
	});

	uploader.bind('FilesAdded', function(up, files) {
		for (var i in files) {
			$('#filelist').html($('#filelist').html()+
'<div id="' + files[i].id + '">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ') <b></b><a href="javascript:void(0)" iid="'+files[i].id+'" class="plupload_del_file" title="удалить из очереди">[X]</a></div>');
      }
		$("#uploadfiles").show();
	});

	uploader.bind('BeforeUpload', function (up, file) {
//    	$.extend(up.settings.multipart_params,{
//			'id': iid
//    	});
	});

	uploader.bind('UploadFile', function (up, file) {
	});

	uploader.bind('FileUploaded', function (up, file,info) {
		if (info.response.substring(0,7) === "FILEID:") {
// add any message
/*
			addImage("thumbnail.php?page=x50&file=images/items/"+get_tag(info.response,"name"));
*/
			$("a.plupload_del_file[iid="+file.id+"]").remove();

			$('#filelist').fadeTo(2000,1,function() {$(this).html("All files uploaded")});
			$("#pickfiles").show();
			upload_state = false;
		}
	});

	uploader.bind('UploadProgress', function(up, file) {
		$("#"+file.id+" b:eq(0)").html('<span>' + file.percent + "%</span>");
	});

	uploader.bind('Error', function(up, err) {
//		$("#"+file.id+" b:eq(0)").html('<span>' + file.percent + "%</span>");
		if (err.code == -601) {
			$('div#'+err.file.id).attr('error','1').append(' <span class="red">Недопустимое расширение файла</span>');
			$("#pickfiles").show();
			$("#uploadfiles").hide();
		}
	});   $("div.thumbnails img").live("dblclick",function(e) {
      $this = $(this);
      index = $("#thumbnails-"+color+" img").index($this);
      $.post("admin.php?page=ajax&command=img_del",{id:iid,color:color,index:index,what:"img"},function(data) {
         if (data == "ok") {
            $this.remove();
         } else { alert("Error deleting image"); alert(data); }
      });
      e.preventDefault();
      e.stopPropagation();
   });
	
	$('#uploadfiles').bind('click',function(e) {
		upload_state = true;

		uploader.start();
		
		$("#pickfiles").hide();
		$("#uploadfiles").hide();

		return false;
	});

   $(".plupload_del_file").live("click",function(e) {
      var iid = $(this).attr("iid");

      var file = uploader.getFile(iid);

		if (typeof file != 'undefined')
	      uploader.removeFile(file);

      $("#"+iid).remove();
      
      if ($('#filelist').find('div[error]').length == 0)
			$("#uploadfiles").show();

      e.preventDefault();
      e.stopPropagation();
   });

   $("div.thumbnails img").live("dblclick",function(e) {
      $this = $(this);
      index = $("#thumbnails-"+color+" img").index($this);
      $.post("admin.php?page=ajax_upload&command=img_del",{id:iid,color:color,index:index,what:"img"},function(data) {
         if (data == "ok") {
            $this.remove();
         } else { alert("Error deleting image"); alert(data); }
      });
      e.preventDefault();
      e.stopPropagation();
   });

      $(".plupload_mk_first").live("click",function(e) {
      $this = $(this);

      color = $this.attr("color");
      index = $this.attr("index");

      src = $("#thumbnails-"+color+" img:eq("+index+")").attr("src");

      $.post("admin.php?page=ajax_upload&command=img_first",{color:color,index:index,id:iid},function(data) {
         if (data == "ok") {
            $("#thumbnails-"+color+" a.plupload_mk_first").html("[-]");
            $this.html("[+]");
         } else { alert("Error occured when moving image"); alert(data); }
      });
      e.preventDefault();
      e.stopPropagation();
   });

	uploader.init();
});
