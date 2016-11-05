var CardAddView = Backbone.View.extend({
  tagName: 'div',
  template: App.templates.add_card,
  events: {
    "submit": 'createCard',
    "keydown": 'forceSubmit',
    "click a.close_card_form": "destroy",
    "blur textarea": "close",
  },
  close: function(){
    setTimeout(this.destroy.bind(this), 100);
  },
  forceSubmit: function(e){
      if (e.which == 13) {
        e.preventDefault();
        $(e.target).parents('form').submit();
      }
  },
  createCard: function(e){
    e.preventDefault();
    var text = $(e.target).find('textarea').val().trim();
    if(/\S/.test(text)){
      App.createCard(this.model, text);
    }
    this.destroy();
  },
  destroy: function(){
    this.trigger('closing_card_form');
    this.undelegateEvents();
    this.$el.remove();
  },
  render: function(){
    this.$el.html(this.template())
    this.model.view.$el.find('div.cards').append(this.$el);
    this.$el.find('textarea').focus();
  },
  initialize: function(){
    this.render();
  }
});