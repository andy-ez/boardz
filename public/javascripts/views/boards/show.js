var BoardShowView = Backbone.View.extend({
  el: 'main',
  template: App.templates.board_show,
  events: {
    "click #board_title h1": "showBoardEditForm",
    "click a.close, a.close_list_form": "hideAllForms",
    "click div.add_list": "showListForm",
    "focus input[type='text']": "hideError",
    "submit #edit_board_form": "updateBoardName", 
    "submit #add_list_form": "createList"
  },
  showListForm: function(e){
    $(e.target).hide();
    $('#add_list_form').show().find("input[type='text']").select();
  },
  hideListForm: function(){
    $('div.add_list').show();
    $('#add_list_form').hide()[0].reset();
  },
  hideListFormDelayed: function(){
    setTimeout(this.hideListForm, 150);
  },
  hideAllForms: function(){
    var self = this;
    setTimeout(function(){
      self.hideForm();
      self.hideListForm();
    }, 100);
  },
  showBoardEditForm: function(){
    $('#edit_board_form').show();
    $("#edit_board_form input[type='text']").select();
  },
  hideForm: function(e){
    setTimeout(function(){
      $('#edit_board_form').hide();
    }, 150);
  },
  displayError: function(){
    $("section form input[type='text']").css('border', '1px solid #b00b00');
    $('p.error_msg').show();
  },
  hideError: function(){
    $("form input[type='text']").css('border', 'none');
    $('p.error_msg').hide();
  },
  updateBoardName: function(e){
    e.preventDefault();
    var new_name = $(e.target).serializeArray()[0].value.trim();
    if (App.validateName(new_name)){
      this.model.save({name: new_name});
      this.hideForm();
      $('#board_title h1').text(new_name);
    }else{
      this.displayError();
    }
  },
  createList: function(e){
    e.preventDefault();
    var new_name = $(e.target).serializeArray()[0].value.trim();
    if (App.validateName(new_name)){
      App.createList(this.model, new_name);
      this.hideAllForms();
    }else{
      this.displayError();
    }
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.find('ul.list_sortable').sortable({
        containment: 'parent',
        tolerance: 'pointer',
        opacity: 0.8,
        cancel: ':input,button,.contenteditable,.not_sortable',
        helper: 'clone',
        delay: 100,
        start: function (e, ui) {
          ui.placeholder.css({
            'visibility': 'visible',
            'background': 'rgba(0, 0, 0, 0.2)'
          })
          ui.helper.css({
            'transform': 'rotate(-15deg)'
          })
        },
        stop: function(e, ui) {
            ui.item.trigger('moved_list', ui.item.index());
            $('#add_list_group').detach().appendTo($('#lists_index'));
        }
    });
  },
  initialize: function(){
    this.render();
    // this.listenTo(this.model, 'change', this.render);
  }
});