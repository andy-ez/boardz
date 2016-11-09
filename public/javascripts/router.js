var router = new (Backbone.Router.extend({
  routes: {
    "board/:query": App.openBoard
  },
  index: function(){
    App.indexView();
  },
  initialize: function() {
    this.route(/index.html$/, "index", this.index);
  }
}))();