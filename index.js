function ElementObject(el, constraints){
  this.el = el;
  this.maxChars = constraints.max;
  this.minChars = constraints.min;
  this.counterEl = document.getElementById(el.name + '-counter');
  this.listener = this.el.addEventListener('keyup', function(){
    this.displayLimits();
  }.bind(this))

  this.getCount = function() {
      return this.el.value.length;
    }
  this.calcLimit = function(type) {
      return {
        maxCalc: function(num){ this.maxChars - num },
        minCalc: function(num){ this.minChars - num }
      }[type](this.getCount())
    },
  this.displayLimits = function(){
      let min = this.calcLimit('minCalc')
      let max = this.calcLimit('maxCalc')
      if( min > 0 ){
        this.notEnoughChars(min);
      } else if(max >= 0) {
        this.showRemaining()
      } else {
        this.tooManyChars()
      }
    }
  this.notEnoughChars = function(min){
    this.setCounterText("Need " + min + " more characters");
  }
  this.showRemaining = function(count){
    this.setCounterText(count + " characters remaining");
  }
  this.tooManyChars = function(count){
    this.setCounterText("Too Many Characters! Delete " + -count + " more characters");
  }
  this.setCounterText = function(msg){
    this.counterEl.innerHTML = msg;
  }
}

var formValidation = {
  constraints: {
    contents: {
      min: 4,
      max: 140
    },
    password: {
      min: 6,
      max: 16
    },
    title: {
      min: 4,
      max: 32
    }
  },
  title: new ElementObject(document.getElementById('title'), this.constraints.title)
}
