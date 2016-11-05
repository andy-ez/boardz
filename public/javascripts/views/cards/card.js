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
  moveCardList: function(e, old_list, new_list, card, index){
    App.moveCardList(old_list, new_list, card, index);
  },   
  openCard: function(e){
    e.preventDefault();
    console.log('clicked');
  },
  deleteCard: function(){
    var result = confirm("Are you sure you want to delete " + this.model.get('name') + "?");
    if (result) {
       App.deleteCard(this.model);
       this.destroy();
    }
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.remove();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()))
    this.model.list.view.$el.find('ul.card_list').append(this.$el);
  },
  initialize: function(){
    this.render();
  }
});