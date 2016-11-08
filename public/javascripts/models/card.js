var Card = Backbone.Model.extend({
  list: function(){
    return App.lists.findWhere({id: this.get('list_id')});
  },
  board: function(){
    return this.list().board();
  }
});