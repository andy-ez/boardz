var Card = Backbone.Model.extend({
  initialize: function(data){
    this.board = App.boards.get(data.board.id)
    this.list = this.board.lists.get(data.list.id)
  }
});