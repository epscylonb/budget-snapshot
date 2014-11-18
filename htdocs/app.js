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
  },
  format: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  isNumber: function(obj) { return !isNaN(parseFloat(obj)); }
}

var App = {
  init: function() {
    this.budget = Util.store();

    // if no lines exist add some example ones
    if (this.budget.lines.length == 0) { 
      this.budget.addLine(new Line(10, 1, 'Income', "Salary"));
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
    this.$newIncomeLineBtn = this.$main.find('button#new-income-line');
    this.$newExpenseLineBtn = this.$main.find('button#new-expense-line');
    /*
    this.$main.on('keydown', 'input, select', function(e) { 
      var self = this,
        form = self.parents('form:eq(0)'),
        focusable,
        next;

        if (e.keyCode == 13 || e.keyCode == 9) {
          focusable = form.find('input,select,button').filter(':visible');
          next = focusable.eq(focusable.index(
    }
   */
  },
  render: function(focusIndex) {
    var positiveLines = this.budget.positiveLines();
    var negativeLines = this.budget.negativeLines();
    this.$incomeLineList.html(this.lineTemplate(positiveLines));
    this.$expenseLineList.html(this.lineTemplate(negativeLines));
    this.updateTotals();

    if (focusIndex) {
      var focusable = this.$main.find('input,select,button');
      $(focusable[focusIndex]).focus();
    }
    
    PieChart.draw(this.budget.positiveLines(), 'div#income-pie');
    PieChart.draw(this.budget.negativeLines(), 'div#expense-pie');
  
  },
  updateTotals: function() {
    var table = this.$main.find('table#income-totals')[0];

    var types = Line.LineEnum;

    for (var tKey in types) {
      if (!types.hasOwnProperty(tKey)) { continue; }
      var type = types[tKey];

      var periods =  Budget.PeriodEnum;

      for (var pKey in periods) {
        if (!periods.hasOwnProperty(pKey)) { continue; }
        var period = periods[pKey];
        
        var selector = 'span#';
        selector += period.toLowerCase();
        selector += '-';
        selector += type.toLowerCase();
        $(selector).text(
          Util.format(
            this.budget.per(type, period)
        ));
      }
    }

    $('span#day-total').text(Util.format(this.budget.totalPerDay()));
    $('span#week-total').text(Util.format(this.budget.totalPerWeek()));
    $('span#month-total').text(Util.format(this.budget.totalPerMonth()));
    $('span#year-total').text(Util.format(this.budget.totalPerYear()));
  },
  bindEvents: function() {
    this.$newIncomeLineBtn.on('click', this.createLine.bind(this));
    this.$newExpenseLineBtn.on('click', this.createLine.bind(this));
    this.$main.on('click', '.delete-line', this.deleteLine.bind(this));
//    this.$incomeLineList.on('focusout', this.update.bind(this));
    this.$main.on('change', 'select#period', this.update.bind(this));
    this.$main.on('change', 'input#amount', this.update.bind(this)); 
    this.$main.on('change', 'input#description', this.update.bind(this)); 
  },
  createLine: function(e) {
    var target = $(e.target).closest('button')[0];
    var type = 'Expense';
    if (target.id == 'new-income-line')
      type = 'Income';
    this.budget.addLine(new Line(10, 1, type, 'Description'));
    this.render();
  },
  deleteLine: function(e) {
    var lineDiv = $(e.target).parents('div.line');
    var lineId = lineDiv.find('input#line-id')[0].value;
    this.budget.removeLine(parseInt(lineId));      
    this.render();
  },
  update: function(e) {

    var index = this.$main.find('input,select,button').index(e.target)

    var lineDiv = $(e.target).parents('div.line');
    var lineId = lineDiv.find('input#line-id')[0].value;

    var desc = lineDiv.find('input#description')[0].value;
    var amount = lineDiv.find('input#amount')[0].value;
    var period = $(lineDiv.find('select#period')[0]).val();

    if (!Util.isNumber(amount)) { 
      // TODO: flash an error up
      this.render();
      return; 
    }

    var line = this.budget.getLine(parseInt(lineId));
    line.description = desc;
    line.amount = amount;
    line.days = period;
    this.render(index+1);
  }
}

App.init();
