function LineException(message) {
  this.message = message
  this.name = 'LineException'
}

var Line = function(amount, days, type, description) {
  if (amount < 1)
    throw new LineException('Amount must be greater than 0: ' + amount)
  this.amount = amount

  this.days = days

  if (type != 'Income' && type != 'Expense') 
    throw new LineException('Line type is invalid: ' + type)
  this.type = type

  if (!description) 
    throw new LineException('Description is null or empty')
  this.description = description
}

Line.prototype.perYear = function() { return (this.amount / this.days) * 365 }
Line.prototype.perWeek = function() { return (this.amount / this.days) * 7 }
Line.prototype.perMonth = function() { return (this.amount / this.days) * 30 }
Line.prototype.perDay = function() { return (this.amount / this.days) * 1 }

