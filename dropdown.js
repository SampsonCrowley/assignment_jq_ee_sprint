function Dropdown(params={}) {
  if(!(this instanceof Dropdown)){
    return new Dropdown(params)
  }

  this.params = params;

  this.map = function(arr, funct){
    var newArr = []
    for(i = 0; i < arr.length; i++){
      newArr.push(funct(arr[i], i));
    }
    return newArr
  }

  this.addActive = function(el){
    if(!el.classList.contains('active')){
      el.classList.add('active')
    }
  }
  this.removeActive = function(el){
    el.classList.remove('active')
  }

  this.setInput = function(e){
    var dropdown = e.target.parentElement
    dropdown.querySelector("input.dropdown-input").value = e.target.getAttribute("data-value");
  }

  this.slideDown = function(e){
    var children = e.target.parentElement.children;
    var height = window.getComputedStyle(children[0],null).height;
    var height = height.substring(0, height.length - 2);
    console.log(height * children.length);
    e.target.parentElement.style.height = height * children.length;
    this.map(children, function(el, i){
      el.style['top'] = (height * i+1) +"px";
    })
  }

  this.slideUp = function(e){
    var children = e.target.parentElement.children;
    var self = this;
    e.target.parentElement.style.height = window.getComputedStyle(children[0],null).height;
    this.map(children, function(el, i){
      self.removeActive(el);
      el.style['top'] = 0;
    })
    this.addActive(e.target);
    this.setInput(e);
  }

  this.slide = function(e){
    var dropdown = e.target.parentElement;
    if(dropdown.classList.contains('active')){
      this.slideUp(e);
      this.removeActive(dropdown);
    }else{
      this.slideDown(e);
      this.addActive(dropdown);
    }
  }

  this.setTransition = function(el) {
    var speedString = ""
    speedString += ' ' + (el.getAttribute('easing') || this.params.easing || 'ease');
    speedString += ' ' + (el.getAttribute('speed') || this.params.speed || '1s');
    this.map(el.children, function(el) {
      el.style.transition = "top" + speedString;
    });
    el.style.transition = "height" + speedString;
  };

  this.init = function() {
    self = this;
    this.dropdown = self.params.element || document.getElementsByClassName('dropdown')[0];
    this.setTransition(self.dropdown);
    this.dropdown.addEventListener('click', function(e) {
      self.slide(e);
    });
    return self;
  }
  this.init();
}
// Dropdown.ready = function(params) {
//   // Mozilla, Opera and webkit nightlies currently support this event
//
//   if ( document.addEventListener ) {
//     // Use the handy event callback
//     document.addEventListener( "DOMContentLoaded", function(){
//       document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
//       return new Dropdown(params);
//     }, false );
//
//     // If IE event model is used
//   } else if ( document.attachEvent ) {
//     var d = window.document;
//     var done = false;
//     // only fire once
//     var init = function () {
//       if (!done) {
//         done = true;
//         return new Dropdown(params);
//       }
//     };
//     // polling for no errors
//     (function () {
//       try {
//         // throws errors until after ondocumentready
//         d.documentElement.doScroll('left');
//       } catch (e) {
//         setTimeout(arguments.callee, 50);
//         return;
//       }
//       // no errors, fire
//       return init();
//     })();
//     // trying to always fire before onload
//     d.onreadystatechange = function() {
//       if (d.readyState == 'complete') {
//         d.onreadystatechange = null;
//         return init();
//       }
//     };
//
//   } else {
//     window.addEventListener('load', function() {
//       new Dropdown(params);
//     }, false);
//   }
// };

new Dropdown();
new Dropdown({ element: document.getElementById('dropdown'), easing: 'none', speed: '0.5s' });
