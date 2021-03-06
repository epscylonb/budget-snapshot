JS.Test.describe('Budget', function() { with(this) {
  before(function() { with(this) {
    this.budget = new Budget();
  }});

  describe('getting lines', function() { with(this) {
    it('returns positive lines', function() { with(this) {
      budget.lines = []; // empty lines;
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      line = new Line(10, 1, 'Expense', 'Lunch');
      budget.addLine(line);
      var lines = budget.positiveLines();
      assert(lines.length == 1);
    }});

    it('returns negative lines', function() { with(this) {
      budget.lines = []; // empty lines;
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      line = new Line(10, 1, 'Expense', 'Lunch');
      budget.addLine(line);
      var lines = budget.negativeLines();
      assert(lines.length == 1);
    }});
    
    it('gets single line by id', function() { with(this) {
      budget.lines = []; // empty lines;
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      line = new Line(20, 1, 'Expense', 'Lunch');
      budget.addLine(line);
      line = budget.getLine(2);
      assert(line.amount === 20);
    }});

  }});

  describe('adding and removing lines', function() { with(this) { 
    // lines should be an empty array
    it('returns 0', function() { with(this) {
      assert(budget.lines.length === 0);
    }});

    // should be able to add to lines
    it('returns 1', function() { with(this) {
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.lines.length == 1);
    }});
  
    it('assigns the line an id if it does not have one', function() { with(this) {
      budget.lines = []; // empty lines;
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.lines[0].id == 1);
    }});

    it('throws error if line id is already taken', function() { with(this) {
      this.budget = new Budget();
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      var line2 = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      line2.id = 1;
      assertThrows(BudgetException, function() { 
        budget.addLine(line2);
      });
    }});

    it('removes a line', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      budget.removeLine(line.id);
      assert(budget.lines.length === 0);
    }});

    it('removes specific line', function() { with(this) {
      budget.lines = []; // empty lines
      var line1 = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line1);
      var line2 = new Line(10, 1, Line.LineEnum.INCOME, 'investments');
      budget.addLine(line2);
      budget.removeLine(line1.id);
      assert(budget.lines[0].description == 'investments');
    }});
  }});

  describe('to csv', function() { with(this) {
    it('should return a string', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line); 
      var csv = budget.toCSV();
      assert(typeof csv == 'string');
    }});

    it('should contain a new line char', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line); 
      var csv = budget.toCSV();

      assert(csv.indexOf('\n') != -1);
    }});

    it('budget and csv should have same number of lines', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line); 
      var csv = budget.toCSV();

      var lines = csv.split('\n');
      assert((lines.length - 2) == budget.lines.length);

    }});

    it('should have five fields on a line', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line); 
      var csv = budget.toCSV();

      var lines = csv.split('\n');
      var fields = lines[0].split(',');

      assert(fields.length == 5);
    }});

    it('first field should be "description"', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line); 
      var csv = budget.toCSV();

      var lines = csv.split('\n');
      var fields = lines[0].split(',');

      assert(fields[0] == '"description"');
    }});
  }});

  describe('totals', function() { with(this) { 
    it('returns 10', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerDay() == 10);
    }}); 

    it('returns 20', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(20, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerDay() == 20);
    }}); 

    it('returns 70', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerWeek() == 70);
    }});

    it('returns 300', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerMonth() == 300);
    }});

    it('returns 3650', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerYear() == 3650);
    }});

    it('returns -140', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.EXPENSE, 'lunch');
      budget.addLine(line);
      line = new Line(10, 1, Line.LineEnum.EXPENSE, 'dinner');
      budget.addLine(line);
      assert(budget.totalPerWeek() == -140);
    }});
    
    it('formatted to two decimal places', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(1.111, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.totalPerWeek() == 7.78);
    }});

    it('income per day', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.INCOME, Budget.PeriodEnum.DAY) == 10);
    }});

    it('income per week', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(10, 1, Line.LineEnum.INCOME, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.INCOME, Budget.PeriodEnum.WEEK) == 70);
    }});

    it('expenses per day', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(20, 1, Line.LineEnum.EXPENSE, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.EXPENSE, Budget.PeriodEnum.DAY) == 20);
    }});

    it('expenses per month', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(20, 30, Line.LineEnum.EXPENSE, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.EXPENSE, Budget.PeriodEnum.MONTH) == 20);
    }});

    it('expenses per year', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(20, 365, Line.LineEnum.EXPENSE, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.EXPENSE, Budget.PeriodEnum.YEAR) == 20);
    }});

    it('totals per year', function() { with(this) {
      budget.lines = []; // empty lines
      var line = new Line(20, 365, Line.LineEnum.EXPENSE, 'salary');
      budget.addLine(line);
      assert(budget.per(Line.LineEnum.EXPENSE, Budget.PeriodEnum.YEAR) == 20);
    }});
  }});
}});
