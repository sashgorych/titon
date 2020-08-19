function strpos(data) {
	// Created by Mark Tali [webcodes.ru]
	// Example. Return 8, but if index > 2, then return null
	// strpos({str: 'Bla-bla-bla...', find: 'bla', index: 2});
	var haystack = data.str, needle = data.find, offset = 0;
	for (var i = 0; i < haystack.split(needle).length; i++) {
		var index = haystack.indexOf(needle, offset + (data.index != 1 ? 1 : 0));
		if (i == data.index - 1) return (index != -1 ? index : null); else offset = index;
	}
}

function SetFormValues() {
	var callback = false;
	if (typeof arguments[arguments.length - 1] == 'function') callback = arguments[arguments.length - 1];

	var obj = arguments[0];
	if (typeof obj == "object") for (var id in obj) { console.log($("#"+id).val()); $("#"+id).val(obj[id]); console.log($("#"+id).val()); }
	else for (i=0;i<obj.length<<1;i++) { console.log("noobj#"+obj[i>>1]); $("#"+obj[i>>1]).val(obj[i>>1+1]); }
	if (typeof callback == 'function') callback();
}

function serializeToJson(serializer){
    var _string = '{';
    for(var ix in serializer)
    {
        var row = serializer[ix];
        _string += '"' + row.name + '":"' + row.value + '",';
    }
    var end =_string.length - 1;
    _string = _string.substr(0, end);
    _string += '}';
    console.log(_string);
    //return JSON.parse(_string);
    return _string;
}

