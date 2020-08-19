
function getTag(html,tag){
    var b,e;
    b = html.indexOf('<'+tag+'>');
    e = html.indexOf('</'+tag+'>');
    if(b<0 || e<0 || e<=b)
        return '';
    return html.substring(b+2+tag.length, e);
}

$(document).ready(function() {

	// --------------------
	$('.request-form-trigger').on('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();

		$this = $(this);
		var act = $this.attr('action');
		$this.find('.all-req-frm-inp').each( function(i,e) { 
			$(this).parent().removeClass('error');
		});
		$this.find('.error-txt-in-form').each( function(i,e) { $(this).hide(); });

		var url = act+'?'+$this.serialize();
		//console.log(url);
		$.ajax({
			url: url,
			dataType : "html",
			data: '',
			success: function (data, textStatus) {
				//console.log(data);
				var info = $.parseJSON(data);
				console.log(info);
				if (info.status=='ok') {
					$this.find('.all-req-frm-inp').each( function(i,e) { $(this).val(); });
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
						} else */ 
						//$(".cback-" + i).prev().show().parent().addClass('wrong');
						$this.find('.req-frm-'+ i +'-inp').addClass('error').next().show();
					});
				}
			},
		});
	});

	//$('.phone-mask').inputmask("999.999.9999", {placeholder:"X", autoclear: true} );
	
	function labnolThumb(id) {
	        var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
	            play = '<div class="play"></div>';
	        return thumb.replace("ID", id) + play;
	}

	function labnolIframe() {
	        var iframe = document.createElement("iframe");
	        var embed = "https://www.youtube.com/embed/ID?autoplay=1";
	        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
	        iframe.setAttribute("frameborder", "0");
	        iframe.setAttribute("allowfullscreen", "1");
	        this.parentNode.replaceChild(iframe, this);
	}

        var div, n, v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
                div = document.createElement("div");
                div.setAttribute("data-id", v[n].dataset.id);
                div.innerHTML = labnolThumb(v[n].dataset.id);
                div.onclick = labnolIframe;
                v[n].appendChild(div);
        }

});

