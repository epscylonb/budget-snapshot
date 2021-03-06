Handlebars.registerHelper('period', function(line, period) {
  if (period == 'Day' && line.days == 1) { return 'selected'; }
  if (period == 'Week' && line.days == 7) { return 'selected'; }
  if (period == 'Month' && line.days == 30) { return 'selected'; }
  if (period == 'Year' && line.days == 365) { return 'selected'; }
  return '';
});

var Util = {
  store: function(namespace, lines) {
    if (arguments.length > 1) {
      localStorage.setItem('budget-lines', JSON.stringify(lines));
    } else {
      var budget = new Budget();
      var sLines = localStorage.getItem('budget-lines');
      if (sLines) {
        lines = JSON.parse(sLines);
        if (lines) {
          for (var i = 0; i < lines.length; i++) {
            budget.addLine(new Line(
              lines[i].amount, 
              lines[i].days,
              lines[i].type,
              lines[i].description
            ));
          }
          budget.lastId = lines.length;
          return budget;
        }
      }
      return new Budget();
    }
  },
  format: function(x) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  isNumber: function(obj) { return !isNaN(parseFloat(obj)); }
};

var App = {
  init: function() {
    this.budget = Util.store('budget-snapshot');
    if (!this.budget) {
      this.budget = new Budget();
    }

    // if no lines exist add some example ones
    if (this.budget.lines.length === 0) { 
      this.budget.addLine(new Line(10, 1, 'Income', "Salary"));
      this.budget.addLine(new Line(10, 1, 'Expense', "Rent"));
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
    this.$incomePiePeriodRdio = $('input[name=incomePiePeriod]');
    this.$expensePiePeriodRdio = $('input[name=expensePiePeriod]');
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
      $(focusable[focusIndex]).select();
    }
    
    var incomePiePeriod = this.$incomePiePeriodRdio.filter(':checked').val();
    var expensePiePeriod = this.$expensePiePeriodRdio.filter(':checked').val();
    PieChart.draw(this.budget.positiveLines(), 'div#income-pie', incomePiePeriod);
    PieChart.draw(this.budget.negativeLines(), 'div#expense-pie', expensePiePeriod);

    Util.store('budget-snapshot', this.budget.lines, this.budget);
    $('#flash').hide();
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
    this.$main.on('change', 'select#period', this.update.bind(this));
    this.$main.on('change', 'input#amount', this.update.bind(this)); 
    this.$main.on('change', 'input#description', this.update.bind(this)); 
    this.$incomePiePeriodRdio.on('change', this.render.bind(this));
    this.$expensePiePeriodRdio.on('change', this.render.bind(this));
    $('#csv-button').on('click', this.downloadCSV.bind(this));
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

    var index = this.$main.find('input,select,button').index(e.target);

    var lineDiv = $(e.target).parents('div.line');
    var lineId = lineDiv.find('input#line-id')[0].value;

    var desc = lineDiv.find('input#description')[0].value;
    var amount = lineDiv.find('input#amount')[0].value;
    var period = $(lineDiv.find('select#period')[0]).val();

    if (!Util.isNumber(amount)) { 
      this.render();
      $('#flash').show();
      $('#flash').text('Amount "' + amount +'" is not numeric');
      return; 
    }

    var line = this.budget.getLine(parseInt(lineId));
    line.description = desc;
    line.amount = amount;
    line.days = period;
    this.render(index+1);
  },
  downloadCSV: function() {
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += this.budget.toCSV();
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }
};

App.init();
