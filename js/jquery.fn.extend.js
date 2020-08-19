//function isNumeric(n) {
//	var temp = '' + n;
//	return (n - 0) == n && temp.length > 0;
//}

jQuery.fn.groupWidth = function() {
	var w = 0;

	this.each(function(i,el) {
		w += $(this).width();
	});

	return w;
}

jQuery.fn.center = function() {
	var w = $(window).width();
	var h = $(window).height();

	var w1 = this.width();
	var h1 = this.height();

	var left = Math.floor((w-w1)/2);
	var top = Math.floor((h-h1)/2);

	if (left < 0) left = 0;
	if (top < 0) top = 0;

	this.css("left",left+"px");
	this.css("top",top+$(document).scrollTop()+"px");

	return this;
}

jQuery.fn.centerParent = function() {
	var w = this.parent().width();
	var h = this.parent().height();

	var w1 = this.width();
	var h1 = this.height();

	this.css("left",Math.floor((w-w1)/2)+"px");
	this.css("top",Math.floor((h-h1)/2)+"px");

	return this;
}

jQuery.fn.centerContent = function(parent) {
	var w = parent.width();
	var h = parent.height();

	var w1 = this.width();
	var h1 = this.height();

	this.css("left",Math.floor((w-w1)/2)+"px");
	this.css("top",Math.floor((h-h1)/2)+"px");

	return this;
}

jQuery.fn.centerParentX = function(offset) {
	var w = this.parent().width()-offset;
	var w1 = this.width();

	this.css("left",Math.floor((w-w1)/2)+offset+"px");

	return this;
}

jQuery.fn.centerParentY = function() {
	var h = this.parent().height();
	var h1 = this.height();

	this.css("top",Math.floor((h-h1)/2)+"px");

	return this;
}

jQuery.fn.outer = function() {
	return $( $("<a></a>").html(this.clone())).html();
}

function fitBack() {

	var $back = $("#back img");

	var w = $(window).width();
	var h = $(window).height();

	var pxw = w/h;
	var pxb = $back.width()/$back.height();
//alert(pxw+": "+pxb);
	if (pxb >= pxw) {
		$back.css("height","100%");
		h = $back.height();
		$back.css("width",h*pxb);
	}
	else {
		$back.css("width","100%");
		w = $back.width();
		$back.css("height",w/pxb);
	}
}

function fitImage() {
	var img = $("#full");
	var parent = $("#content");

	var w = parent.width();
	var h = parent.height();

	var pxw = w/h;
	var pxb = img.width()/img.height();

	if (pxb >= pxw) {
		img.css("width","100%");
		w = img.width();
		img.css("height",w/pxb);
	}
	else {
		img.css("height","100%");
		h = img.height();
		img.css("width",h*pxb);
	}
}

function get_tag(data, tag) {
   var b,e;
   b = data.indexOf('<'+tag+'>');
   e = data.indexOf('</'+tag+'>');
   if(b < 0 || e < 0 || e <= b) return '';
   return data.substring(b+2+tag.length,e);
}
/*
function getTag(html,tag){
    var b,e;
    b = html.indexOf('<'+tag+'>');
    e = html.indexOf('</'+tag+'>');
    if(b<0 || e<0 || e<=b)
        return '';
    return html.substring(b+2+tag.length, e);
}

function remTag(html,tag){
    var b,e;
    b = html.indexOf('<'+tag+'>');
    e = html.indexOf('</'+tag+'>');
    if(b<0 || e<0 || e<=b)
        return html;
    return remTag(html.substring(0, b) + html.substring(e+3+tag.length, html.length));
}
*/
function isEmail(s) {
	var regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

	return regEmail.test(s);
}
/*
function isValidSelector(selector) {
    try {
        var $element = $(selector);
    } catch(error) {
        return false;
    }
    return true;
}
*/
jQuery.extend({
    isValidSelector: function(selector) {
        try {
            var $element = $(selector);
        } catch(error) {
            return false;
        }
        return true;
    }
});

function con(s) {
	console.log(s);
}

function getRandomNumber(range) {
	return Math.floor(Math.random() * range);
}

function getRandomChar() {
	var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
	return chars.substr( getRandomNumber(62), 1 );
}

function randomID(size) {
	var str = "";
	for(var i = 0; i < size; i++)
	{
		str += getRandomChar();
	}
	return str;
}

var uid = (function(){var id=0;return function(){if(arguments[0]===0)id=0;return id++;}})();

/*
content could be either html string or jQuery selector
string is considered to be a new object
and selector is existing in current document
*/
function cover(content, selector, options) {
	var copy = content;
	var rid = randomID(10);
	var placeholder = '';
	var defaults = {
      close: '.close',
      modal: false
    };

	if (typeof options != 'undefined') {
		$.extend(defaults, options);
	}

	if ($.isValidSelector(content) && $(content).length > 0) {
		copy = $(content).outer();
		placeholder = jQuery('<div id="'+rid+'"><!--'+copy+'--></div>');

		$(content).replaceWith(placeholder);
	}

   var dh = $(document).height();
   var wh = $(window).height();

   $('body').append('<div id="coverx" style="position:absolute;top:0;left:0;right:0;bottom:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmBgYGgCCDAAAIcAg0R6/qYAAAAASUVORK5CYII=) 0 0 repeat;z-index:100000;display:none"></div>');

   $cv = $('#coverx');

   $cv.css('bottom', '')
      .height((dh > wh ? dh : wh))
      .html(copy);

   $(selector).center().css({
      'position': 'absolute',
      'z-index': '200000'
   });

   $cv.fadeTo(300, 1, function() { 
      $(selector).show();
   });

   function close() {
      $(selector).hide().remove();

      if (placeholder.length == 1) {
         copy = placeholder.html();
         copy = copy.substring(4, copy.length-3);
         placeholder.replaceWith(copy);
      }

      $cv.html('').fadeTo(300, 0, function() { $cv.remove(); });
   }

   if (!defaults.modal)
   $cv.on('click', function(e) {
      if (e.target == this) close();
   });

   if ($(defaults.close).length > 0)
   $cv.find(defaults.close).on('click', function(e) {
      $(selector).hide().remove();

      close();

      e.preventDefault();
      e.stopPropagation();
   });

}

var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190}

function u1251(s) {
    var L = []
    for (var i=0; i<s.length; i++) {
        var ord = s.charCodeAt(i)
        if (!(ord in DMap))
            throw "Character "+s.charAt(i)+" isn't supported by win1251!"
        L.push(String.fromCharCode(DMap[ord]))
    }
    return L.join('')
}

$.fn.bindFirst = function(name, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.on(name, fn);

    // Thanks to a comment by @Martin, adding support for
    // namespaced events too.
    this.each(function() {
        var handlers = $._data(this, 'events')[name.split('.')[0]];
        // take out the handler we just inserted from the end
        var handler = handlers.pop();
        // move it at the beginning
        handlers.splice(0, 0, handler);
    });
};

function preload(imgs, callback) {
	var cnt = 0;

	$(imgs).each(function() {
//		$('<img />')[0].src = this;
//console.log(this);
		var im = new Image();

		im.onload = function() {
//console.log(this);
			if (++cnt == imgs.length && callback)
				callback();
		}

		im.src = this;
	});
}


$(window).load(function() {

	$("input,textarea").filter('[placeholder]').each(function() { 
		var $this = $(this);
		var ofs = $this.offset();
		var id = $this.attr('id');
		var ph = $this.attr('placeholder');

		if (id == '') return false;

		var label = '<label for="'+id+'" class="placeholder" style="display:none;position:absolute;z-index:100000;top:'+(ofs.top+2)+'px;left:'+(ofs.left+5)+'px;">'+ph+'</label>';

		$('body').append(label);
		$this.removeAttr('placeholder');

		if ($this.val() == '') {
			$('label[for='+id+']').show();
		}

//		$(document).on('focus', $this, function(e) {
		$this.on('focus', function(e) {
			var id = $(this).attr('id');
			$('label[for='+id+']').hide();
		});

//		$(document).on('blur', $this, function(e) {
		$this.on('blur', function(e) {
			var id = $(this).attr('id');

			if ($(this).val() == '')
				$('label[for='+id+']').show();
		});
	});

});

