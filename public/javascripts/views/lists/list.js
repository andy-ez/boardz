var ListItemView = Backbone.View.extend({
  tagName: 'li',
  attributes: function(){
    var id = this.model.get('id');
    return {
      'data-id': id
    }
  },
  template: App.templates.list_view,
  events: {
    "blur h3": 'changeName',
    "click div.list_title i": "deleteList",
    "click div.list_title h3": "selectText",
    "keydown div.list_title h3": "commitChange",
    "mouseover i": "shake",
    "click div.add_card": "addCardView",
    "moved_list": "updateRank"
  },
  updateRank: function(e, index) {
      App.updateRank(this.model, index);
  },    
  addCardView: function(e){
    $(e.target).hide();
    this.cardForm = new CardAddView({model: this.model});
    var div = this.$el.find('div.cards')[0];
    div.scrollTop = div.scrollHeight;
    this.listenTo(this.cardForm, 'closing_card_form', this.showAddForm);
  },
  showAddForm: function(){
    $('div.add_card').show();
  },
  commitChange: function(key){
    if(key.which == 13){
      key.preventDefault();
      window.getSelection().empty();
      $(key.target).blur();
    }
  },
  shake: function(e){
    $(e.target).effect("shake", {
      times: 2,
      direction: "up",
      distance: 1
    });
  },
  selectText: function(e){
    document.execCommand('selectAll',false,null);
  },
  changeName: function(e){
    var new_name = $(e.target).text().trim();
    if(App.validateName(new_name)){
      this.model.save({name: new_name});
    }else{
      $(e.target).text(this.model.get('name'));
    }
  },
  deleteList: function(){
    var result = confirm("Are you sure you want to delete " + this.model.get('name') + "?");
    if (result) {
       App.deleteList(this.model);
       this.destroy();
    }
  },
  destroy: function(){
    var self = this;
    self.$el.css({'transform': 'rotate(20deg)', 'position': 'fixed'});
    self.$el.animate({top: 0}, 1000, function(){
      self.undelegateEvents();
      self.$el.remove();
    });
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()))
    $('#lists_index').prepend(this.$el);
    var oldListID, newListID, item,
        self = this;
      self.$el.find('ul').sortable({
          tolerance: 'pointer',
          opacity: 1,
          helper: 'clone',
          delay: 100,
          dropOnEmpty: true,
          start: function(event, ui) {
            ui.placeholder.css({
              'visibility': 'visible',
              'background': 'rgba(0, 0, 0, 0.2)',
              'border': '2px #777777 dashed'
            })
            ui.helper.css({
              'transform': 'rotate(-5deg)',
              'background': '#f9f9f9'
            })
            // console.log(ui.item.parents('li').attr('data-id'));
            oldListID = ui.item.parents('li').attr('data-id');
          },
          stop: function(event, ui) {         
            newListID = ui.item.parents('li').attr('data-id');
            if(oldListID === newListID){
              ui.item.trigger('moved_card', ui.item.index());
            }
          },
          receive: function(e, ui){
            var old_id = ui.sender.parents('li').attr('data-id'),
                old_list = self.model.collection.get(old_id),
                new_id = ui.item.parents('li').attr('data-id'),
                new_list = self.model.collection.get(new_id);
                ui.item.trigger('moveCardList', [old_list, new_list, ui.item.index()]);
          },
          connectWith: ".card_sortable"
      });
  },
  initialize: function(){
    this.model.view = this;
    this.render();
      }
});