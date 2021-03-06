var BoardsIndexView = Backbone.View.extend({
  tagName: 'div',
  attributes: {
    class: 'main_content'
  },
  template: App.templates.index,
  events: {
    "click": 'hideContainers',
    "click li.new_board": 'showNewForm',
    "click a.close": 'hideNewForm',
    "submit #new_board_form": 'createBoard',
    "focus #new_board_form input[type='text']": 'hideError'
  },
  showNewForm: function(e){
    $('li.new_board').hide();
    $('li.form').css('display', 'inline-block');
  },
  hideContainers: function(e){
    var container = $("#nav_add_board_form, #nav_board_list, #nav_search_list");
    if (!container.is(e.target)
        && container.has(e.target).length === 0)
    {
        container.hide();
    }
  },
  hideNewForm: function(){
    this.hideError();
    $('#new_board_form')[0].reset();
    $('li.form').hide();
    $('li.new_board').show();
  },
  displayError: function(){
    $("#new_board_form input[type='text']").css('border', '1px solid #b00b00');
    $('p.error_msg').show();
  },
  hideError: function(){
    $("#new_board_form input[type='text']").css('border', 'none');
    $('p.error_msg').hide();
  },
  createBoard: function(e){
    e.preventDefault();
    var new_name = $(e.target).serializeArray()[0].value.trim();
    if (App.validateName(new_name)){
      App.createBoard(new_name);
      this.hideNewForm();
    }else{
      this.displayError();
    }
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.remove();
  },
  render: function(){
    this.$el.html(this.template({boards: this.collection.toJSON()}));
    $('main').html(this.$el);
    $('.sortable').sortable({
      containment: 'parent',
      opacity: 0.8,
      tolerance: 'pointer',
      helper: 'clone',
      delay: 100,
      start: function (e, ui) {
        ui.placeholder.css({
          'visibility': 'visible',
          'background': 'rgba(0, 0, 0, 0.2)',
          'border-radius': '5px',
          'border': '2px #888888 dashed'
        })
        ui.helper.css({
          'transform': 'rotate(-15deg)'
        })
      },
      stop: function(e, ui) {
          ui.item.trigger('moved_board', ui.item.index());
          $('li.form, li.new_board').detach().appendTo($('#boards_list'));
      }
    });
  },
  initialize: function(){
    this.render();
  }
});