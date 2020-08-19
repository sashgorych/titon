$(document).ready( function () {
/*  var ball = document.getElementById('line');
  var leftP = document.getElementById('left-photo');
  var rightP = document.getElementById('riht-photo');
ball.onmousedown = function(e) {

  var coords = getCoords(ball);
  var shiftX = e.pageX - coords.left;
  var leftPhoto = e.pageX - coords.right; // left photo
  var rightPhoto = e.pageX - coords.left; // right photo
  //var shiftY = e.pageY - coords.top;
  //console.log(leftPhoto);
  ball.style.position = 'absolute';
  //document.body.appendChild(ball);
  moveAt(e);

  ball.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    ball.style.left = e.pageX + shiftX + 'px';
    //ball.style.top = e.pageY - shiftY + 'px';
    leftP.style.right = '-'+e.pageX - leftPhoto + 'px'; // left photo
    rightP.style.left = e.pageX + rightPhoto + 'px'; // right photo
    //console.log(ball);
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  ball.onmouseup = function() {
    document.onmousemove = null;
    ball.onmouseup = null;
  };

}

ball.ondragstart = function() {
  return false;
};

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    //top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.right - pageXOffset
  };
}

*/
    var sliderElem = document.getElementById('container-photo');
    var leftP = document.getElementById('left-photo');
    var rightP = document.getElementById('right-photo');
    var thumbElem = sliderElem.children[0];

    thumbElem.onmousedown = function(e) {
      var thumbCoords = getCoords(thumbElem);
      var shiftX = e.pageX - thumbCoords.left;

      var LeftX = e.pageX - thumbCoords.right;
      var rightX = e.pageX - thumbCoords.left;
      // shiftY здесь не нужен, слайдер двигается только по горизонтали

      var sliderCoords = getCoords(sliderElem);

      document.onmousemove = function(e) {
        //  вычесть координату родителя, т.к. position: relative
        var newLeft = e.pageX - shiftX - sliderCoords.left;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';
        //rightP.style.left = newLeft + 'px';
        leftP.style.width = newLeft + 'px';
      }

      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };

      return false; // disable selection start (cursor change)
    };

    thumbElem.ondragstart = function() {
      return false;
    };

    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
      };

    }
} );
