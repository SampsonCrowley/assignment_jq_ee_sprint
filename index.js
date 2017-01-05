function ElementObject(el, constraints){
  var self = this;
  this.el = el;
  this.maxChars = constraints.max;
  this.minChars = constraints.min;
  this.counterEl = document.getElementById(el.name + '-counter');
  this.listener = function(){
      self.displayLimits();
    }

  this.getCount = function() {
      return +this.el.value.length;
    }
  this.calcLimit = function(type) {
      var self = this;
      return {
        maxCalc: function(num){ return self.maxChars - num; },
        minCalc: function(num){ return self.minChars - num; }
      }[type](this.getCount())
    },
  this.displayLimits = function(){
      let min = this.calcLimit('minCalc')
      let max = this.calcLimit('maxCalc')
      if( min > 0 ){
        this.notEnoughChars(min);
      } else if(max >= 0) {
        this.showRemaining(max);
      } else {
        this.tooManyChars(max);
      }
    }
  this.notEnoughChars = function(min){
    this.setCounterText("Need " + min + " more characters");
    this.addError();
  }
  this.showRemaining = function(count){
    this.setCounterText(count + " characters remaining");
    this.removeError();
  }
  this.tooManyChars = function(count){
    this.setCounterText("Too Many Characters! Delete " + (count * -1) + " more characters");
    this.addError();
  }
  this.setCounterText = function(msg){
    this.counterEl.innerHTML = msg;
    this.removeHidden();
  }
  this.removeHidden = function() {
    if (this.counterEl.classList.contains('hidden')) {
      this.counterEl.classList.remove('hidden');
    }
  }
  this.addError = function() {
    if (!this.el.parentNode.classList.contains('error')) {
      this.el.parentNode.classList.add('error');
    }
  }
  this.removeError = function() {
    if (this.el.parentNode.classList.contains('error')) {
      this.el.parentNode.classList.remove('error');
    }
  }
  this.el.addEventListener('keyup', this.listener);
}

function passwordMatches(password, passwordConfirmation) {
  return password.value === passwordConfirmation.value;
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
}

formValidation.title = new ElementObject(document.getElementById('title'), formValidation.constraints.title);

formValidation.contents = new ElementObject(document.getElementById('contents'), formValidation.constraints.contents);

formValidation.password = new ElementObject(document.getElementById('password'), formValidation.constraints.password);

formValidation.passwordConfirmation = new ElementObject(document.getElementById('password-confirmation'), formValidation.constraints.password);

formValidation.passwordCheck = function() {
  var self = this;
  this.password.el.removeEventListener('keyup', this.listener);
  this.passwordConfirmation.el.removeEventListener('keyup', this.listener);

  this.password.listener = this.password.el.addEventListener('keyup', function() {
    var valid = passwordMatches(self.password.el, self.passwordConfirmation.el);
    if (valid) {
      if (self.passwordConfirmation.getCount() === 0) {
        self.passwordConfirmation.displayLimits();
      }
      self.password.displayLimits();
    } else {
      self.password.addError();
      self.password.setCounterText("Password must match confirmation.");
    }
  });

  this.passwordConfirmation.listener = this.passwordConfirmation.el.addEventListener('keyup', function() {
    var valid = passwordMatches(self.password.el, self.passwordConfirmation.el);
    if (valid) {
      self.password.displayLimits();
      self.passwordConfirmation.displayLimits();
    } else {
      self.passwordConfirmation.addError();
      self.passwordConfirmation.setCounterText("Confirmation must match password.");
    }
  });
}

formValidation.passwordCheck();
