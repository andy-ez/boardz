var Boards = Backbone.Collection.extend({
  model: Board,
  localStorage: new Backbone.LocalStorage('boards'),
  rank: 1,
  comparator: 'rank',
  search: function(text){
    if (text){
      var exp = new RegExp(text, 'gi');
      return this.filter(function(board){
        return exp.test(board.get('name'));
      })
    }else{ return []; }
  }
});