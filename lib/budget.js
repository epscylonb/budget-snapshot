function BudgetException(message) {
  this.message = message
  this.name = 'BudgetException'
}

var Budget = function() {}

Budget.prototype.lines = []

Budget.prototype.addLine = function(line) { 
  for (var i = 0, n = this.lines.length; i < n; i++) {
  if (this.lines[i].description == line.description) { 
      throw new BudgetException('Description is not unique') 
    }
  }
  this.lines.push(line) 
}

Budget.prototype.removeLine = function(line) {
  var desc = line.description
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].description == desc) { 
      this.lines.splice(i,1)
      break
    }
  }
}

Budget.prototype.positiveLines = function() {
  var lines = []
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income') { lines.push(this.lines[i]) }
  }
  return lines
}

Budget.prototype.negativeLines = function() {
  var lines = []
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Expense') { lines.push(this.lines[i]) }
  }
  return lines
}

Budget.prototype.totalPerDay = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perDay()
    else
      total -= this.lines[i].perDay()
  }
  return total;
}

Budget.prototype.totalPerWeek = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perWeek()
    else
      total -= this.lines[i].perWeek()
  }
  return total;
}

Budget.prototype.totalPerMonth = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perMonth()
    else
      total -= this.lines[i].perMonth()
  }
  return total;
}

Budget.prototype.totalPerYear = function() {
  var total = 0 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perYear()
    else
      total -= this.lines[i].perYear()
  }
  return total;
}


