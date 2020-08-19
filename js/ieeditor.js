// JavaScript Document
//######################################################################

var isIE = document.all;// && document.all.item;

var leftCropPx = 0;
var widthCropPx = 0;
var rightCropPx = 0;

var topCropPx = 0;
var heightCropPx = 0;
var bottomCropPx = 0;

var scaleEnabled = true;
var scale = 1;

var iWidth  = 224; 
var iHeight = 224;

var iMinWidth  = 224; 
var iMinHeight = 224;

var currRegion = false;
var leftRegion = false;
var rightRegion = false;
var topRegion = false;
var bottomRegion = false;
var viewRegion = false;

var mouseStartX = 0;
var mouseStartY = 0;

var mouseX = 0;
var mouseY = 0;

//######################################################################
function SelectImage(param)
{
	var newLeft = leftCropPx;
	var newWidth = widthCropPx;
	var newRight = rightCropPx;
	var newTop = topCropPx;
	var newHeight = heightCropPx;
	var newBottom = bottomCropPx;
	
	if ( 'all' == param ) { newBottom = newTop = newRight = newLeft = 0; newWidth = iWidth; newHeight = iHeight; }

	if ( 'tl' == param ) { 
		newRight = newRight + newLeft;
		newBottom =  newBottom + newTop;
		newLeft = newTop =0;
	}

	if ( 'tc' == param ) { 
		newBottom =  newBottom + newTop; 
		newTop = 0; 
		x_w = Math.round((iWidth - newWidth) / 2);
		newLeft = newRight = x_w;
	}

	if ( 'tr' == param ) { 
		newLeft = newLeft + newRight;
		newBottom =  newBottom + newTop;
		newRight = newTop =0;
	}

	if ( 'cl' == param ) { 
		newRight = newRight + newLeft; 
		newLeft = 0; 
		y_h = Math.round((iHeight - newHeight) / 2);
		newTop = newBottom = y_h;
	}
	
	if ( 'cr' == param ) { 
		newLeft = newLeft + newRight; 
		newRight = 0; 
		y_h = Math.round((iHeight - newHeight) / 2);
		newTop = newBottom = y_h;

	}

	if ( 'bl' == param ) { 
		newRight = newRight + newLeft;
		newTop =  newTop + newBottom;
		newLeft = newBottom =0;
	}

	if ( 'bc' == param ) { 
		newTop = newTop + newBottom; 
		newBottom = 0; 
		x_w = Math.round((iWidth - newWidth) / 2);
		newLeft = newRight = x_w;
	}

	if ( 'br' == param ) { 
		newLeft = newLeft + newRight;
		newTop =  newTop + newBottom;
		newRight = newBottom =0;
	}
	
	if ( 'max' == param ) { Initialize(); return; }

	if ( 'center' == param || 'cc' == param) { 
		x_w = Math.round((iWidth - newWidth) / 2);
		newLeft = newRight = x_w;
		y_h = Math.round((iHeight - newHeight) / 2);
		newTop = newBottom = y_h;
	}
	
	if ( 'min' == param ) {
		newWidth = iMinWidth;
		newHeight = iMinHeight;
		newLeft = 0;
		newTop = 0;
		newRight = iWidth - iMinWidth;
		newBottom =  iHeight - iMinHeight;;
	}
	
	// отображаем
	if ( newLeft >= 0 && newRight >= 0 && newTop >= 0 && newBottom >= 0 && newWidth >= iMinWidth && newHeight >= iMinHeight )
	{
		leftCropPx = newLeft;
		widthCropPx = newWidth;
		rightCropPx = newRight;
		topCropPx = newTop;
		heightCropPx = newHeight;
		bottomCropPx = newBottom;

		ShowGropSize( );
	}	
}

//######################################################################
function Initialize()
{
	leftRegion = document.getElementById('c_left');
	rightRegion = document.getElementById('c_right');
	topRegion = document.getElementById('c_top');
	bottomRegion = document.getElementById('c_bottom');
	viewRegion = document.getElementById('c_view');
	
	if ( leftRegion && rightRegion && topRegion && bottomRegion && viewRegion )
	{
		widthCropPx = iMinWidth;
		heightCropPx = iMinHeight;

        leftCropPx = Math.round( (iWidth - widthCropPx) / 2 );
        rightCropPx = Math.round( (iWidth - widthCropPx) / 2 );

        topCropPx = Math.round( ( iHeight - heightCropPx ) / 2 );
        bottomCropPx = Math.round( ( iHeight - heightCropPx ) / 2 );		
		scale = heightCropPx / widthCropPx;

		ShowGropSize();
	
		if ( !isIE ) 
		{
	    	document.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP | Event.MOUSEMOVE);
		}

		document.onmousedown = SetMouseDownFlag;
		document.onmouseup = SetMouseUpFlag;
		document.onmousemove = ExecMMoveActions;
		document.ondragstart = new Function ( "return false;" );
	}
}

//######################################################################
function ShowGropSize()
{
/*
		if (isIE)
		{

			leftRegion.style.pixelWidth = 8 + leftCropPx;
			viewRegion.style.pixelWidth = widthCropPx;
			rightRegion.style.pixelWidth = 8 + rightCropPx;
			topRegion.style.pixelHeight = 8 + topCropPx;
			viewRegion.style.pixelHeight = heightCropPx;
			bottomRegion.style.pixelHeight = 8 + bottomCropPx;

        }
        else 
		{
*/			leftRegion.style.width = 8 + leftCropPx + 'px';
			viewRegion.style.width = widthCropPx + 'px';
			topRegion.style.height = 8 + topCropPx + 'px';
			viewRegion.style.height = heightCropPx + 'px';
			rightRegion.style.width = 8 + rightCropPx + 'px';
			bottomRegion.style.height = 8 + bottomCropPx + 'px';

 //       }
/*		
			i_top = document.getElementById('test');
			i_top.value = ' Left='+leftCropPx+
				  ' | Ширина='+widthCropPx+
				  ' | Отступ с права='+rightCropPx+
				  ' | Top='+topCropPx+
				  ' | Высота='+heightCropPx+
				  ' | Отступ с низу='+bottomCropPx;
*/
}
//######################################################################
function OnTableMouseMove()
{
	
	if( false == currRegion ) return;

	shiftX = mouseX - mouseStartX;
	shiftY = mouseY - mouseStartY;

	if ( Math.abs( shiftX ) < 2 && Math.abs( shiftY ) < 2 ) return;

	mouseStartX = mouseX;
	mouseStartY = mouseY;

	var newLeft = leftCropPx;
	var newWidth = widthCropPx;
	var newRight = rightCropPx;
	var newTop = topCropPx;
	var newHeight = heightCropPx;
	var newBottom = bottomCropPx;
	
	if ( 'left' == currRegion )
	{
		newLeft = newLeft + shiftX;
		newWidth = iWidth - newLeft - newRight;
		if( scaleEnabled )
		{
			newTop = Math.round( newTop + ( heightCropPx - newWidth * scale - 0.06) /2);
			newHeight = iHeight - newTop - newBottom;
		}
	}
	
	if ( 'top' == currRegion )
	{
		newTop = newTop + shiftY;
		newHeight = iHeight - newTop - newBottom;
		if( scaleEnabled )
		{
			newLeft = Math.round( newLeft + ( widthCropPx - newHeight / scale + 0.05) /2);
			newWidth = iWidth - newLeft - newRight;
		}
	}

	if ( 'right' == currRegion )
	{
		newRight = newRight - shiftX;
		newWidth = iWidth - newLeft - newRight;
		if( scaleEnabled )
		{
			newBottom = Math.round( newBottom + ( heightCropPx - newWidth * scale - 0.06) /2);
			newHeight = iHeight - newTop - newBottom;
		}
	}
	
	if ( 'bottom' == currRegion )
	{
		newBottom = newBottom - shiftY;
		newHeight = iHeight - newTop - newBottom;
		if( scaleEnabled )
		{
			newRight = Math.round( newRight + ( widthCropPx - newHeight / scale + 0.05) /2);
			newWidth = iWidth - newLeft - newRight;
		}
	}

	if ( 'view' == currRegion )
	{
		newLeft = newLeft + shiftX;
		newRight = newRight - shiftX;
		newTop = newTop + shiftY;
		newBottom = newBottom - shiftY;
	}
	
	// отображаем
	if ( newLeft >= 0 && newRight >= 0 && newTop >= 0 && newBottom >= 0 && newWidth >= iMinWidth && newHeight >= iMinHeight )
	{
		leftCropPx = newLeft;
		widthCropPx = newWidth;
		rightCropPx = newRight;
		topCropPx = newTop;
		heightCropPx = newHeight;
		bottomCropPx = newBottom;

		ShowGropSize( );
	}
}
//######################################################################
function OnTableMouseUp()
{
	currRegion = false;
}
//######################################################################
function SetSelectedRegion( regionName )
{
	if ( 'left' == regionName || 'right' == regionName || 'top' == regionName || 'bottom' == regionName || 'view' == regionName)
		currRegion = regionName;
	else
		currRegion = false;
}

//######################################################################
function SetMouseDownFlag(ev)
{

	mouseStartX = mouseX;
	mouseStartY = mouseY;
	
}
//######################################################################
function SetMouseUpFlag(ev)
{

	currRegion = false;

}
//######################################################################
function ExecMMoveActions(ev)
{
	
	if ( isIE )
	{
        mouseX = window.event.x;
        mouseY = window.event.y;
    }
    else 
	{
        mouseX = ev.pageX;
        mouseY = ev.pageY;
    }

}
//######################################################################
function UpdateForm()
{
	v1 = document.getElementById('i_top');
	v2 = document.getElementById('i_left');
	v3 = document.getElementById('i_width');
	v4 = document.getElementById('i_height');

	v1.value = topCropPx;
	v2.value = leftCropPx;
	v3.value = widthCropPx;
	v4.value = heightCropPx;
	var pg = window.parent.$('#base-nova-page').val() + '/ajax?command=save-crop';

	var smallw = parseInt(document.getElementById('smallw').value);
	var smallh = parseInt(document.getElementById('smallh').value);
	var sourceImageWidth  = parseInt(document.getElementById('originalw').value);
	var sourceImageHeight = parseInt(document.getElementById('originalh').value);
	
	var ratio_x = parseFloat(sourceImageWidth / smallw);
	var ratio_y = parseFloat(sourceImageHeight / smallh);
	var new_x = leftCropPx * ratio_x;
	var new_y = topCropPx * ratio_y;
	var new_w = widthCropPx * ratio_x;
	var new_h = heightCropPx * ratio_y;

	console.log(new_x);
	console.log(new_y);
	
	var mdfname = document.getElementById('md5name').value;
	var jsondata = $.parseJSON( window.parent.$('#' + mdfname).val() );
	jsondata.coord = { 'left' : new_x, 'top' : new_y, 'width' : new_w, 'height' : new_h };
	jsondata.cutstatus = true;

	window.parent.$('#' + mdfname).text( JSON.stringify( jsondata ) );
	window.parent.$("#popup-for-crop").addClass("hidden");
	window.parent.$(".popap_section-crop").slideUp(300);
	window.parent.RefreshPhoto( mdfname );
	
	//$('#cropform').attr('action', pg )
	//console.log( pg + '&' + $('#cropform').serialize() );
	//$('#cropform').submit();
	
}
//######################################################################