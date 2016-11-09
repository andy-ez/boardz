var Cards = Backbone.Collection.extend({
  model: Card,
  localStorage: new Backbone.LocalStorage('cards'),
  comparator: function(model){
    return -model.get('rank');
  },
  search: function(text){
    if (text){
      var exp = new RegExp(text, 'gi');
      return this.filter(function(board){
        return exp.test(board.get('name'));
      })
    }else{ return []; }
  }
});