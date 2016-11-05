var Lists = Backbone.Collection.extend({
  model: List,
  rank: 1,
  comparator: 'rank'
});
