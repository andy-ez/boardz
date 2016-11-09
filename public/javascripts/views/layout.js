var LayoutView = Backbone.View.extend({
  tagName: 'nav',
  template: App.templates.layout,
  events: {
    "click a.brand": "home",
    "click span[title^='Cl']": "clearStorage",
    "keyup": "showSearchResults",
    "click i.fa-search": "toggleSearch",
    "submit #nav_search_form": "searchSubmit"
  },
  searchSubmit: function(e){
    e.preventDefault();
  },
  toggleSearch: function(){
    if ($('#nav_search_form').is(':visible')  && ($(window).width() < 800)){
      $('#nav_search_form')[0].reset();
      $('#nav_search_form').css({'display': 'none'});
    }else{
      $('#nav_search_form').css({'display': 'inline-block'});
    }
  },
  showSearchResults: function(e){
    var search_term = $(e.target).val().trim();
    this.trigger('searching', search_term);
  },
  clearStorage: function(){
    var result = confirm("This will DELETE ALL APPLICATION DATA. Proceed?");
    if (result){
      App.reset();
    }
  },
  destroy: function(){
    this.undelegateEvents();
    this.$el.remove();
  },
  home: function(){
    App.indexView();
  },
  render: function(){
    this.$el.html(this.template({boards: App.boards}));
    $('header.navbar').html(this.$el);
  },
  initialize: function(){
    this.render();
  }
})