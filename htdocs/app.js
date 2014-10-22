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
  }, 
  cacheElements: function() {
    this.lineTemplate = Handlebars.compile($('#line-template').html()); 
    this.$main = $('#main');
    this.$lineList = this.$main.find('#line-list');
}

App.init();
