var LayoutView = Backbone.View.extend({
  el: App.$el[0],
  template: App.templates.layout,
  events: {
    "click a.brand": "home"
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