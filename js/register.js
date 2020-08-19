$(document).ready(function(){

	$(":input").inputmask();
	
	// --------------------
	$('#callback-form').on('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();

		$this = $(this);
		var act = $this.attr('action');
		$('.all-cback-inp').parent().removeClass('wrong');
		$('.form_error_text').hide();
		var url = act+'?'+$('#callback-form').serialize();
		//console.log(url);
		$.ajax({
			url: url,
			dataType : "html",
			data: '',
			success: function (data, textStatus) {
			console.log(data);
				var info = $.parseJSON(data);
			console.log(info);
				if (info.status=='ok') {
					//document.location.replace(info.url);
					$('.all-cback-inp').val('');
					showPopUpText( '.message-popup', 'Your request has been sent' );
				} else {
					// show errors ...
					$.each(info.errors, function(i, val) {
						/*if (i == 'confirm') {
							var elm = $('#reg-confirm').next()
							var elm1 = elm.next();
							elm.css( 'border', '1px solid #ffd532');
							elm1.css( 'color', '#ffd532');						
							elm1.children().css( 'color', '#ffd532');						
						} else */ $(".cback-" + i).prev().show().parent().addClass('wrong');
					});
				}
			},
		});
	});

});