var Lists = Backbone.Collection.extend({
  model: List,
  comparator: 'rank',
  localStorage: new Backbone.LocalStorage('lists')
});
