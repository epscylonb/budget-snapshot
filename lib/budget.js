function BudgetException(message) {
  this.message = message;
  this.name = 'BudgetException';
}

var Budget = function() {
  this.lastId = 0;
}

Budget.prototype.lines = [];

Budget.prototype.addLine = function(line) { 
  if (!line.id) {
    line.id = ++this.lastId;
  } else {
    for (var i = 0, n = this.lines.length; i < n; i++) {
      if (this.lines[i].id == line.id) {
        throw new BudgetException('Line already exists with id: ' + line.id);
      }
    }
  }

  this.lines.push(line);
}

Budget.prototype.removeLine = function(lineId) {
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].id == lineId) { 
      this.lines.splice(i,1);
      break;
    }
  }
}

Budget.prototype.getLine = function(id) {
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].id == id)
      return this.lines[i];
  }
}

Budget.prototype.positiveLines = function() {
  var lines = [];
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income') { lines.push(this.lines[i]) }
  }
  return lines;
}

Budget.prototype.negativeLines = function() {
  var lines = [];
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Expense') { lines.push(this.lines[i]) }
  }
  return lines;
}

Budget.prototype.totalPerDay = function() {
  var total = 0; 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perDay()
    else
      total -= this.lines[i].perDay()
  }
  return total;
}

Budget.prototype.totalPerWeek = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perWeek();
    else
      total -= this.lines[i].perWeek();
  }
  return total;
}

Budget.prototype.totalPerMonth = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perMonth();
    else
      total -= this.lines[i].perMonth();
  }
  return total;
}

Budget.prototype.totalPerYear = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == 'Income')
      total += this.lines[i].perYear();
    else
      total -= this.lines[i].perYear();
  }
  return total;
}


