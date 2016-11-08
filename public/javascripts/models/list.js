var List = Backbone.Model.extend({
  next_card_rank: 1,
  board: function(){
    return App.boards.findWhere({id: this.get('board_id')});
  },
  cards: function(){
    return App.cards.where({list_id: this.id});
  }
});