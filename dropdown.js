function dropdown() {

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
    var children = e.target.parentElement.children
    var height = window.getComputedStyle(children[0],null).height
    var height = height.substring(0, height.length - 2)
    map(children, function(el, i){
      el.style['top'] = (height * i+1) +"px";
    })
  }

  this.slideUp = function(e){
    var children = e.target.parentElement.children
    map(children, function(el, i){
      removeActive(el);
      el.style['top'] = 0;
    })
    addActive(e.target);
    setInput(e)
  }

  this.slide = function(e){
    var dropdown = e.target.parentElement
    if(dropdown.classList.contains('active')){
      slideUp(e);
      removeActive(dropdown)
    }else{
      slideDown(e);
      addActive(dropdown)
    }
  }

  this.ready = function(funct) {
    // Mozilla, Opera and webkit nightlies currently support this event
    var self = this;

    if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", function(){
        document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
        return funct(self);
      }, false );

      // If IE event model is used
    } else if ( document.attachEvent ) {
      var d = window.document;
      var done = false;
      // only fire once
      var init = function () {
        if (!done) {
          done = true;
          return funct(self);
        }
      };
      // polling for no errors
      (function () {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(arguments.callee, 50);
          return;
        }
        // no errors, fire
        return init(self);
      })();
      // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null;
          return init(self);
        }
      };

    } else {
      window.addEventListener('load', funct, false);
    }
  };

  this.init = function(self) {
    self.dropdown = document.getElementsByClassName('dropdown');
    self.map(dropdown, function(el){
      el.addEventListener('click', slide);
    });
    return self;
  }

  return this.ready(this.init);
}

dropdown();
