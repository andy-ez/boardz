var SearchView = Backbone.View.extend({
  attributes: {
    id: 'search_results'
  },
  template: App.templates.search_result,
  events: {
    "click li.board_result_item": "openBoard",
    "click li.list_result_item": "openList",
    "click li.card_result_item": "openCard"
  },
  openBoard: function(e){
    var id =  $(e.target).attr('data-id') || $(e.target).parent('li').attr('data-id');
    App.openBoard(id);
  },
  openList: function(e){
    var id =  $(e.target).attr('data-id') || $(e.target).parent('li').attr('data-id');
    App.openList(id);
  },
  openCard: function(e){
    var id =  $(e.target).attr('data-id') || $(e.target).parent('li').attr('data-id');
    App.openCard(id);
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.remove();
  },
  render: function(){
    var total = this.cards.length + this.boards.length + this.lists.length;
    this.$el.html(this.template({
      cards: this.cards,
      lists: this.lists,
      boards: this.boards,
      total: total
    }));
    $('main').append(this.$el);
  },
  bind: function(){
    var self = this;
    $("#nav_search_form input[type='text']").on('blur', function(e){
      setTimeout(function(){
        self.destroy();
        $(e.target).parents('form')[0].reset();
      }, 150)
    });
  },
  initialize: function(data){
    this.cards = data.cards;
    this.lists = data.lists;
    this.boards = data.boards;
    this.render();
    this.bind();
  }
})