var Cards = Backbone.Collection.extend({
  model: Card,
  rank: 1,
  comparator: function(model){
    return -model.get('rank');
  },
  initialize: function(name){
    this.localStorage = new Backbone.LocalStorage(name);
  }
});