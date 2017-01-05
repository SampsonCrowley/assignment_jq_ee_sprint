function dropdown(params={}) {
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
      this.slideUp(e);
      this.removeActive(dropdown)
    }else{
      this.slideDown(e);
      this.addActive(dropdown)
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
      }.bind(this), false );

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
      }.bind(this);

    } else {
      window.addEventListener('load', function() {
        funct(self);
      }.bind(this), false);
    }
  };

  this.setTransition = function(el) {
    var transitionString = "top";
    transitionString += ' ' + (el.getAttribute('easing') || this.params.easing || 'ease');
    transitionString += ' ' + (el.getAttribute('speed') || this.params.speed || '1s');
    this.map(el.children, function(el) {
      el.style.transition = transitionString;
    });
  };

  this.init = function(self) {
    self.dropdown = self.params.element || document.getElementsByClassName('dropdown')[0];
    self.setTransition(self.dropdown);
    self.dropdown.addEventListener('click', function(e) {
      self.slide(e);
    }.bind(self));
    return self;
  }

  return this.ready(this.init);
}

new dropdown();
new dropdown({ element: document.getElementById('dropdown'), easing: 'none', speed: '0.5s' });
