JS.Test.describe('Budget', function() { with(this) {
  before(function() { with(this) {
    this.Budget = new Budget()
  }})

  describe('adding and removing lines', function() { with(this) { 
    // lines should be an empty array
    it('returns 0', function() { with(this) {
      assert( Budget.lines.length == 0 )
    }}) 

    // should be able to add to lines
    it('returns 1', function() { with(this) {
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.lines.length == 1)
    }})

    // should not be able to add two lines with the same description
    it('throws an error', function() { with(this) {      
      Budget.lines = [] // empty lines
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assertThrows(Error, function() { 
        var line = new Line(10, 1, 'Income')
        Budget.addLine(line)
      })
    }})
  }})

  describe('totals', function() { with(this) { 
    it('returns 10', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.totalPerDay() == 10 )     
    }}) 

    it('returns 20', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(20, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.totalPerDay() == 20 )     
    }}) 

    it('returns 70', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.totalPerWeek() == 70 )     
    }}) 

    it('returns 300', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.totalPerMonth() == 300 )     
    }}) 

    it('returns 3650', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(10, 1, 'Income')
      Budget.addLine(line)
      assert( Budget.totalPerYear() == 3650 )     
    }}) 

    it('returns -140', function() { with(this) {
      Budget.lines = [] // empty lines
      var line = new Line(-10, 1, 'Income1')
      Budget.addLine(line)
      var line = new Line(-10, 1, 'Income2')
      Budget.addLine(line)
      assert( Budget.totalPerWeek() == -140 )     
    }}) 
  }})
}}) 
