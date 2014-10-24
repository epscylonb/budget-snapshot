Handlebars.registerHelper('period', function(line, period) {
  if (period == 'Day' && line.days == 1) { return 'active' }
  if (period == 'Week' && line.days == 7) { return 'active' }
  if (period == 'Month' && line.days == 30) { return 'active' }
  if (period == 'Year' && line.days == 365) { return 'active' }
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
      this.budget.addLine(new Line(10, 1, "Salary"));
      this.budget.addLine(new Line(-10, 1, "Lunch"));
    }

    this.cacheElements();
    this.render();
  }, 
  cacheElements: function() {
    var template = $('#line-template').html();
    this.lineTemplate = Handlebars.compile(template); 
    this.$main = $('#main');
    this.$incomeLineList = this.$main.find('#income-line-list');
    this.$expenseLineList = this.$main.find('#expense-line-list');
  },
  render: function() {
    var positiveLines = this.budget.positiveLines();
    var negativeLines = this.budget.negativeLines();
    this.$incomeLineList.html(this.lineTemplate(positiveLines));
    this.$expenseLineList.html(this.lineTemplate(negativeLines));
  }
}

App.init();
