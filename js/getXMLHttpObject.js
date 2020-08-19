function GetXmlHttpObject() {
	var xmlHttp=null;
	try { xmlHttp=new XMLHttpRequest(); } // Firefox, Opera 8.0+, Safari
	catch (e) {
		// Internet Explorer
		try { xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e) { xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");	}
	}
	return xmlHttp;
}

