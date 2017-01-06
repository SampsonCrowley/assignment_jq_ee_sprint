map = function(arr, funct){
  var newArr = []
  for(i = 0; i < arr.length; i++){
    newArr.push(funct(arr[i], i));
  }
  return newArr
}
var taggerDivTop = document.getElementById("image-hover-top");
var taggerDivBottom = document.getElementById("image-hover-bottom");
var taggerDivLeft = document.getElementById("image-hover-left");
var taggerDivRight = document.getElementById("image-hover-right");
var taggers = [
  taggerDivTop,
  taggerDivBottom,
  taggerDivLeft,
  taggerDivRight
]

imageWrapper = document.getElementById("taggable");

moveDivToCursor = function(e){
  map(taggers, function(el, i){
    el.style.display = "block";
    if( i % 2 === 0){
      el.style.top = e.y - 50;
      el.style.left = e.x - 50;
    }else if ( i == 3) {
      el.style.top = e.y - 50;
      el.style.left = e.x + 50;
    }else{
      el.style.top = e.y + 50;
      el.style.left = e.x - 50;
    }
  })
}

imageWrapper.addEventListener('mousemove', function(e){
  moveDivToCursor(e)
})
