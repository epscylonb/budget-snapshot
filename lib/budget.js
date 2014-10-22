var Budget = function() {}

Budget.prototype.lines = []

Budget.prototype.addLine = function(line) { 
  for (var i = 0, n = this.lines.length; i < n; i++) {
  if (this.lines[i]._description == line._description) { 
      throw new Error('Description is not unique') 
    }
  }
  this.lines.push(line) 
}

Budget.prototype.totalPerDay = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    total += this.lines[i].perDay()
  }
  return total;
}

Budget.prototype.totalPerWeek = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    total += this.lines[i].perWeek()
  }
  return total;
}

Budget.prototype.totalPerMonth = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    total += this.lines[i].perMonth()
  }
  return total;
}

Budget.prototype.totalPerYear = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    total += this.lines[i].perYear()
  }
  return total;
}




