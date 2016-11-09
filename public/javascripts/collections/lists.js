var Lists = Backbone.Collection.extend({
  model: List,
  comparator: 'rank',
  localStorage: new Backbone.LocalStorage('lists'),
  search: function(text){
    if (text){
      var exp = new RegExp(text, 'gi');
      return this.filter(function(board){
        return exp.test(board.get('name'));
      })
    }else{ return [] ;}
  }
});
