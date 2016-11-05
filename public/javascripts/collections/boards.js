var Boards = Backbone.Collection.extend({
  model: Board,
  localStorage: new Backbone.LocalStorage('boards'),
  rank: 1,
  initialize: function(){
  },
  comparator: 'rank'
});