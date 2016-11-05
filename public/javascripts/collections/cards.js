var Cards = Backbone.Collection.extend({
  model: Card,
  localStorage: new Backbone.LocalStorage('cards'),
  comparator: function(model){
    return -model.get('rank');
  }
});