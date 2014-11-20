function BudgetException(message) {
  this.message = message;
  this.name = 'BudgetException';
}

var Budget = function() {
  this.lastId = 0;
};

Budget.PeriodEnum = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year'
};

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
};

Budget.prototype.removeLine = function(lineId) {
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].id == lineId) { 
      this.lines.splice(i,1);
      break;
    }
  }
};

Budget.prototype.getLine = function(id) {
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].id == id)
      return this.lines[i];
  }
};

Budget.prototype.positiveLines = function() {
  var lines = [];
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.INCOME) { lines.push(this.lines[i]); }
  }
  return lines;
};

Budget.prototype.negativeLines = function() {
  var lines = [];
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.EXPENSE) { lines.push(this.lines[i]); }
  }
  return lines;
};

Budget.prototype.totalPerDay = function() {
  var total = 0; 
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.INCOME)
      total += this.lines[i].perDay();
    else
      total -= this.lines[i].perDay();
  }
  return total.toFixed(2);
};

Budget.prototype.totalPerWeek = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.INCOME)
      total += this.lines[i].perWeek();
    else
      total -= this.lines[i].perWeek();
  }
  return total.toFixed(2);
};

Budget.prototype.totalPerMonth = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.INCOME)
      total += this.lines[i].perMonth();
    else
      total -= this.lines[i].perMonth();
  }
  return total.toFixed(2);
};

Budget.prototype.totalPerYear = function() {
  var total = 0;
  for (var i = 0, n = this.lines.length; i < n; i++) {
    if (this.lines[i].type == Line.LineEnum.INCOME)
      total += this.lines[i].perYear();
    else
      total -= this.lines[i].perYear();
  }
  return total.toFixed(2);
};

Budget.prototype.per = function(type, period) {
  var total = 0;
  var lines;
  if (type == Line.LineEnum.INCOME) { lines = this.positiveLines(); }
  if (type == Line.LineEnum.EXPENSE) { lines = this.negativeLines(); }

  for (var i = 0, n = lines.length; i < n; i++) {
    if (period == Budget.PeriodEnum.DAY) { total += lines[i].perDay(); }
    if (period == Budget.PeriodEnum.WEEK) { total += lines[i].perWeek(); }
    if (period == Budget.PeriodEnum.MONTH) { total += lines[i].perMonth(); }
    if (period == Budget.PeriodEnum.YEAR) { total += lines[i].perYear(); }
  }

  return total.toFixed(2);
};

Budget.prototype.toCSV = function() { 
  var csv = '\"description\",\"day\",\"week\",\"month\",\"year"\n';
  for (var i = 0, n = this.lines.length; i < n; i++) {
    csv += this.lines[i].toCSVRow();
    csv += '\n';
  }

  return csv;
};
