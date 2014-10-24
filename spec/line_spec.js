JS.Test.describe('Line', function() { with(this) {

  before(function() { with(this) {
    this.line = new Line(10, 1, 'Income')
  }})

  describe('amount per year', function() { with(this) {
    it('returns 3650', function() { with(this) {
      assert( line.perYear() == 3650 ) 
    }})

    it('returns 70', function() { with(this) {
      this.line = new Line(10, 1, 'Income')
      assert( line.perWeek() == 70)
    }})

    it('returns 300', function() { with(this) {
      this.line = new Line(10, 1, 'Income')
      assert( line.perMonth() == 300)
    }})

    it('returns 10', function() { with(this) {
      assert( line.perDay() == 10)
    }})

    it('returns -70', function() { with(this) {
      this.line = new Line(-10, 1, 'Expense')
      assert( line.perWeek() == -70)
    }})
  }})
}})

