var CardShowView = Backbone.View.extend({
  el: '#card_show_view',
  // tagName: 'div',
  // attributes: {
  //   id: "card_show_view"
  // },
  template: App.templates.card_show,
  events: {
    "click #modal_layer": "destroy",
    "click #card_shown > a": "destroy",
    "click span.edit_card_description": 'showDescriptionForm',
    "blur textarea[name='card_description']": 'hideDescriptionForm',
    "submit #card_description_form": 'updateDescription'
  },
  updateDescription: function(e){
    e.preventDefault();
    var new_description = $(e.target).find('textarea').val().trim();
    if(/\S/.test(new_description)){
      this.model.save({description: new_description});
    }
  },
  hideDescriptionForm: function(e){
    setTimeout(function(){
      $('span.edit_card_description').show();
      $('#card_description_form').hide();
      if ($('#card_description p').length > 0){
        $('#card_description p').show();
      }
    }, 200)
  },
  showDescriptionForm: function(e){
    $('#card_description_form').show().find('textarea').focus();
    $(e.target).hide();
    if ($('#card_description p').length > 0){
      $('#card_description p').hide();
    }
  },
  render: function(){
    this.$el.html(this.template({
      card: this.model.toJSON(),
      list: this.model.list().toJSON()
    }));
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.html('');
  },
  initialize: function(){
    this.render();
    this.listenTo(this.model, 'change:description', this.render);
  }
})