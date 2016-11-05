var List = Backbone.Model.extend({
  initialize: function(options){
    this.board = App.boards.get(options.board.id)
    this.cards = new Cards();
    this.cards.localStorage = new Backbone.LocalStorage(options.board.id + "_lists_" + options.id);
  }
});