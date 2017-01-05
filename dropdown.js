var map = function(arr, funct){
  var newArr = []
  for(i = 0; i < arr.length; i++){
    newArr.push(funct(arr[i], i));
  }
  return newArr
}

var dropdown = document.getElementsByClassName('dropdown');

var addActive = function(el){
  if(!el.classList.contains('active')){
    el.classList.add('active')
  }
}
var removeActive = function(el){
  el.classList.remove('active')
}

var setInput = function(e){
  var dropdown = e.target.parentElement
  dropdown.querySelector("input.dropdown-input").value = e.target.getAttribute("data-value");
}

var slideDown = function(e){
  var children = e.target.parentElement.children
  var height = window.getComputedStyle(children[0],null).height
  var height = height.substring(0, height.length - 2)
  map(children, function(el, i){
    el.style['top'] = (height * i+1) +"px";
  })
}

var slideUp = function(e){
  var children = e.target.parentElement.children
  map(children, function(el, i){
    removeActive(el);
    el.style['top'] = 0;
  })
  addActive(e.target);
  setInput(e)
}

var slide = function(e){
  var dropdown = e.target.parentElement
  if(dropdown.classList.contains('active')){
    slideUp(e);
    removeActive(dropdown)
  }else{
    slideDown(e);
    addActive(dropdown)
  }
}

map(dropdown, function(el){
  el.addEventListener('click', slide);
})
