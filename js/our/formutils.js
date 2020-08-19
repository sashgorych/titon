function CopyFormObjValue(form_name, paramname_to, paramname_from, attrname_to, attrname_from, submitflag, ask)
{
	isconfirmed = 0;
	if (typeof(ask) != 'undefined') {
	   if (confirm(ask)) isconfirmed = 1;
	   else isconfirmed = 2;
	}
    if (isconfirmed==0 || isconfirmed==1) {
		if (typeof(document.forms[form_name].elements[paramname_from])!='undefined')
			value_from = document.forms[form_name].elements[paramname_from].getAttribute(attrname_from);

		if (typeof(document.forms[form_name].elements[paramname_to])!='undefined')
			document.forms[form_name].elements[paramname_to].setAttribute(attrname_to, value_from);
		if (submitflag==true) document.forms[form_name].submit();
	}
}

function ChangeFormObjectValue(form_name, paramname, attrname, value_, submitflag, ask)
{
	isconfirmed = 0;
	if (typeof(ask) != 'undefined') {
	   if (confirm(ask)) isconfirmed = 1;
	   else isconfirmed = 2;
	}
	if (isconfirmed==0 || isconfirmed==1) {
		//alert(typeof(document.forms[form_name].elements[paramname]));
		if (typeof(document.forms[form_name].elements[paramname])!='undefined')
			document.forms[form_name].elements[paramname].setAttribute(attrname, value_);
		//alert(document.forms[form_name].elements[paramname].getAttribute(attrname));
		if (submitflag==true) document.forms[form_name].submit();
	}
}

function CopyFormObjectValueTo(form_name_to, paramname_to, form_name_from, paramname_from, attrname, submitflag, ask)
{
	isconfirmed = 0;
	if (typeof(ask) != 'undefined') {
	   if (confirm(ask)) isconfirmed = 1;
	   else isconfirmed = 2;
	}
    if (isconfirmed==0 || isconfirmed==1) {
		if (typeof(document.forms[form_name].elements[paramname_from])!='undefined')
			value_from = document.forms[form_name_from].elements[paramname_from].getAttribute(attrname);
		if (typeof(document.forms[form_name].elements[paramname_to])!='undefined')
			document.forms[form_name_to].elements[paramname_to].setAttribute(attrname, value_from);
		if (submitflag==true) document.forms[form_name_to].submit();
	}
}


function CopyObjectValueTo(paramname_to, paramname_from, attrname, ask)
{
	isconfirmed = 0;
	if (typeof(ask) != 'undefined') {
	   if (confirm(ask)) isconfirmed = 1;
	   else isconfirmed = 2;
	}
    if (isconfirmed==0 || isconfirmed==1) {
		obj_from = document.getElementById(paramname_from);
		obj_to = document.getElementById(paramname_to);
		obj_to.setAttribute(attrname, obj_from.getAttribute(attrname));
	}
}

function ChangeObjectValue(paramname, attrname, value_, ask)
{
	isconfirmed = 0;
	if (typeof(ask) != 'undefined') {
	   if (confirm(ask)) isconfirmed = 1;
	   else isconfirmed = 2;
	}
	if (isconfirmed==0 || isconfirmed==1) {
		obj_ = document.getElementById(paramname);
		obj_.setAttribute(attrname, value_);
	}
}

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


function loadAjax (url, eval_expr) {

    new Ajax.Request(url,
        {
            method:'get',
            onSuccess: function(transport) {
                var response = transport.responseText;
                if (eval_expr!= '') { eval (eval_expr); }
            },
            onFailure: function(){ alert('Ошибка запроса к серверу!');
        }
    });
}

function loadAjaxJQ (url, params, eval_expr) {

	$.ajax({
	    url: url,       		 	   // указываем URL и
	    dataType : "html",                     // тип загружаемых данных
            data: params,
            success: function (data, textStatus) { 
                var response = data;
                if (eval_expr!= '') { eval (eval_expr); }
            },
            error: function(){ alert('Ошибка запроса к серверу!') }
	});

}

function clearFileInputField(tagId) {
	var elm = document.getElementById(tagId);
	if (elm!=null) elm.innerHTML = document.getElementById(tagId).innerHTML;
	/* Example: 
	<div id="uploadFile_div"> 
		<input type="file" class="fieldMoz" id="uploadFile" onkeydown="return false;" size="40" name="uploadFile"/> 
	</div> 
	<a onclick="clearFileInputField('uploadFile_div')" href="javascript:noAction();">Clear</a> 
	*/
}

function FCKGetData(fckname) {
	var raw = '';
	var html = '';
	var calclength = 0;
	if ( typeof( FCKeditorAPI ) != 'undefined' ) {
		oEditor = FCKeditorAPI.GetInstance(fckname);
		if ( typeof( oEditor ) != 'undefined' ) {
			html = oEditor.GetHTML();
			var oDOM = oEditor.EditorDocument ;
			// if ( typeof( oDOM ) != 'undefined' ) {
			// If Internet Explorer.
			if ( document.all ) {
				calclength = oDOM.body.innerText.length ;
				raw = oDOM.body.innerText;
			} // If Gecko.
			else {
				var r = oDOM.createRange() ;
				r.selectNodeContents( oDOM.body ) ;
				calclength = r.toString().length ;
				raw = r.toString();
				if ( oEditor.EditMode == FCK_EDITMODE_WYSIWYG )	oEditor.MakeEditable() ;
			}
		}
	}
	return [calclength, raw, html];
}

function FCKSetData(fckname, val) {
	if ( typeof( FCKeditorAPI ) != 'undefined' ) {
		oEditor = FCKeditorAPI.GetInstance(fckname);
		if ( typeof( oEditor ) != 'undefined' ) {
			var oDOM = oEditor.EditorDocument ;
			if (document.all) {
                		oDOM.body.innerHTML = val;// for IE
            		} //For firefox
			else {
                		var geckoRange = oDOM.createRange();
                		geckoRange.selectNodeContents(oDOM.body);
                		geckoRange = val;
                		oDOM.body.innerHTML = geckoRange;
            		}
		}
	}
}


function strip_html(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function _strip_html(html) {
  return html.replace(/<.*?>/g, '');
}

function strip_tags(input, allowed) {
    // http://kevin.vanzonneveld.net
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}
