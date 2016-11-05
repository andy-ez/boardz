var Board = Backbone.Model.extend({
  validListName: function(new_name){
    if (/\S/.test(new_name)) {
      return !this.lists.findWhere({name: new_name});
    }else{
      return false;
    }
  },
  initialize: function(options){
    this.lists = new Lists();
    this.lists.localStorage = new Backbone.LocalStorage('boards_' + options.id);
  }
});