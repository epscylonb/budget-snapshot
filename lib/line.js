var Line = function(amount, days, description) {
  this._amount = amount
  this._days = days
  this._description = description
}

Line.prototype.perYear = function() { return (this._amount / this._days) * 365 }
Line.prototype.perWeek = function() { return (this._amount / this._days) * 7 }
Line.prototype.perMonth = function() { return (this._amount / this._days) * 30 }
Line.prototype.perDay = function() { return (this._amount / this._days) * 1 }

