var BoardItemView = Backbone.View.extend({
  tagName: 'li',
  attributes: function(){
    var id = this.model.get('id');
    return {
      'data-id': id
    }
  },
  template: App.templates.board_index,
  events: {
    "click a": "openBoard",
    "click i": 'deleteBoard',
    "mouseover i": "shake",
    "moved_board": 'updateRank'
  },
  updateRank: function(e, index) {
      App.updateRank(this.model, index);
  },        
  shake: function(e){
    $(e.target).effect('shake', {
      distance: 5,
      times: 3,
      direction: 'left'
    })
  },
  openBoard: function(e){
    e.preventDefault();
    App.openBoard(this.model);
  },
  deleteBoard: function(){
    var result = confirm("Are you sure you want to delete " + this.model.get('name') + "?");
    if (result) {
       App.deleteBoard(this.model);
       this.destroy();
    }
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.remove();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()))
    $('#boards_list').prepend(this.$el);
  },
  initialize: function(){
    this.render();
  }
});