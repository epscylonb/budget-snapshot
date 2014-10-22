var Line = function(amount, days, description) {
  this.amount = amount
  this.days = days
  this.description = description
}

Line.prototype.perYear = function() { return (this.amount / this.days) * 365 }
Line.prototype.perWeek = function() { return (this.amount / this.days) * 7 }
Line.prototype.perMonth = function() { return (this.amount / this.days) * 30 }
Line.prototype.perDay = function() { return (this.amount / this.days) * 1 }

