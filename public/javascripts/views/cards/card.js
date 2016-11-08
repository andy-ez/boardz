var CardItemView = Backbone.View.extend({
  tagName: 'li',
  attributes: function(){
    var id = this.model.get('id');
    return {
      'data-id': id,
      'class': 'card_item',
    }
  },
  template: App.templates.card_view,
  events: {
    'moved_card': 'updateRank',
    'moveCardList': 'moveCardList',
    'click': 'openCard',
    'click span i.fa-trash-o': 'deleteCard'
  },
  updateRank: function(e, index) {
      App.updateRank(this.model, index);
  },
  moveCardList: function(e, old_list, new_list, index){
    App.moveCardList(old_list, new_list, this.model, index);
  },   
  openCard: function(){
    new CardShowView({model: this.model});
  },
  deleteCard: function(){
    App.deleteCard(this.model);
    this.destroy();
  },
  destroy: function(){
    var self = this;
    self.$el.css({'transform': 'rotate(20deg)', 'position': 'fixed'});
    self.$el.animate({bottom: 0}, 500, function(){
      self.undelegateEvents();
      self.$el.remove();
    });
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    var list = App.lists.findWhere({id: this.model.get('list_id')});
    list.view.$el.find('ul.card_list').append(this.$el);
  },
  initialize: function(){
    this.render();
    this.on('deleting', this.deleteCard);
  }
});