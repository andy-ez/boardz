var LayoutView = Backbone.View.extend({
  el: App.$el[0],
  template: App.templates.layout,
  events: {
    "click a.brand": "home",
    "click span[title^='Cl']": "clearStorage"
  },
  clearStorage: function(){
    localStorage.clear();
    App.init();
  },
  home: function(){
    App.indexView();
  },
  render: function(){
    this.$el.html(this.template({boards: App.boards}));
  },
  initialize: function(){
    this.render();
  }
})