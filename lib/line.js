function LineException(message) {
  this.message = message;
  this.name = 'LineException';
}


var Line = function(amount, days, type, description) {
  if (amount < 1)
    throw new LineException('Amount must be greater than 0: ' + amount);
  this.amount = amount;

  this.days = days;

  if (type != Line.LineEnum.INCOME && type != Line.LineEnum.EXPENSE) 
    throw new LineException('Line type is invalid: ' + type);
  this.type = type;

  if (!description) 
    throw new LineException('Description is null or empty');
  this.description = description;
};

Line.LineEnum = {
  INCOME: 'Income',
  EXPENSE: 'Expense'
};

Line.prototype.perYear = function() { return (this.amount / this.days) * 365; };
Line.prototype.perWeek = function() { return (this.amount / this.days) * 7; };
Line.prototype.perMonth = function() { return (this.amount / this.days) * 30; };
Line.prototype.perDay = function() { return (this.amount / this.days) * 1; };

Line.prototype.toCSVRow = function() {
  var row = '\"' + this.description + '\"';
  if (this.type == Line.LineEnum.INCOME) { 
    row += ',' + this.perDay().toFixed(2);
    row += ',' + this.perWeek().toFixed(2);
    row += ',' + this.perMonth().toFixed(2);
    row += ',' + this.perYear().toFixed(2);
  }
  else { 
    row += ',' + this.perDay().toFixed(2) * -1;
    row += ',' + this.perWeek().toFixed(2) * -1;
    row += ',' + this.perMonth().toFixed(2) * -1;
    row += ',' + this.perYear().toFixed(2) * -1;
  }
  return row;
};

