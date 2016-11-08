var Board = Backbone.Model.extend({
  next_list_rank: 1,
  lists: function(){
    return App.lists.where({board_id: this.id});
  },
  cards: function(){
    return App.cards.where({board_id: this.id});
  }
});