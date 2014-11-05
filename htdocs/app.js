Handlebars.registerHelper('period', function(line, period) {
  if (period == 'Day' && line.days == 1) { return 'selected' }
  if (period == 'Week' && line.days == 7) { return 'selected' }
  if (period == 'Month' && line.days == 30) { return 'selected' }
  if (period == 'Year' && line.days == 365) { return 'selected' }
  return '';
});

var Util = {
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || new Budget();
    }
  }
}

var App = {
  init: function() {
    this.budget = Util.store();

    // if no lines exist add some example ones
    if (this.budget.lines.length == 0) { 
      this.budget.addLine(new Line(10, 7, 'Income', "Salary"));
      this.budget.addLine(new Line(10, 1, 'Expense', "Lunch"));
    }

    this.cacheElements();
    this.render();
    this.bindEvents();
  }, 
  cacheElements: function() {
    var template = $('#line-template').html();
    this.lineTemplate = Handlebars.compile(template); 
    this.$main = $('#main');
    this.$incomeLineList = this.$main.find('#income-line-list');
    this.$expenseLineList = this.$main.find('#expense-line-list');
    this.$newIncomeLineBtn = this.$main.find('#new-income-line');
  },
  render: function() {
    var positiveLines = this.budget.positiveLines();
    var negativeLines = this.budget.negativeLines();
    this.$incomeLineList.html(this.lineTemplate(positiveLines));
    this.$expenseLineList.html(this.lineTemplate(negativeLines));
  },
  bindEvents: function() {
    this.$newIncomeLineBtn.on('click', this.create.bind(this));
    this.$incomeLineList.on('focusout', this.update.bind(this));
  },
  create: function(e) {
    type = 'Expense';
    if (e.target.id == 'new-income-line')
      type = 'Income';
    this.budget.addLine(new Line(10, 1, type, 'Description'));
    this.render();
  },
  update: function(e) {
    var lineDiv = $(e.target).parents('div.line');

    var desc = lineDiv.find('input#description')[0].value;
    var amount = lineDiv.find('input#amount')[0].value;
    var period = $(lineDiv.find('select#period')[0]).val();

    var line = this.budget.getLine(desc);
    line.desc = desc;
    line.amount = amount;
    line.days = period;
  }
}

App.init();
