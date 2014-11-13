JS.Test.describe('Line', function() { with(this) {

  before(function() { with(this) {
    this.line = new Line(10, 1, Line.LineEnum.INCOME, 'salary')
  }})

  describe('validation', function() { with(this) {

    it('has invalid type', function() { with(this) {
      assertThrows(LineException, function() { 
        this.line = new Line(10,1,'Not a valid type')
      })
    }})
    
    it('no description is supplied', function() { with(this) {
      assertThrows(LineException, function() { 
        this.line = new Line(10,1,Line.LineEnum.INCOME)
      })
    }})

    it('has positive amount', function() { with(this) {
      assertThrows(LineException, function() { 
        this.line = new Line(-10,1,Line.LineEnum.INCOME, 'salary')
      })
    }})

  }})

  describe('amount per year', function() { with(this) {
    it('returns 3650', function() { with(this) {
      assert( line.perYear() == 3650 ) 
    }})

    it('returns 70', function() { with(this) {
      this.line = new Line(10, 1, Line.LineEnum.INCOME, 'salary')
      assert( line.perWeek() == 70)
    }})

    it('returns 300', function() { with(this) {
      this.line = new Line(10, 1, Line.LineEnum.INCOME, 'lunch')
      assert( line.perMonth() == 300)
    }})

    it('returns 10', function() { with(this) {
      assert( line.perDay() == 10)
    }})
  }})
}})

