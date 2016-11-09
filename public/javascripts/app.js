var App = {
  $el: $('body'),
  templates: JST,
  validateName: function(name){
    return (/\S/.test(name));
  },
  reset: function(){
    localStorage.clear();
    this.navView.destroy();
    this.main_view.destroy();
    this.init();
  },
  indexView: function(){
    if (this.main_view) {this.main_view.destroy();}
    this.main_view = new BoardsIndexView({collection: this.boards});
    this.renderBoards();
  },
  openBoard: function(board){
    if (typeof board === 'string'){
      board = this.boards.findWhere({id: board});
    }
    this.main_view.undelegateEvents();
    this.main_view = new BoardShowView({model: board});
    this.renderLists(board);
    router.navigate(board.get('name'));
  },
  openList: function(list){
    var board;
    if (typeof list === 'string'){
      board = App.lists.findWhere({id: list}).board()
    }else{
      board = list.board();
    }
    this.openBoard(board);
  },
  openCard: function(card){
    var board;
    if (typeof card === 'string'){
      card = App.cards.findWhere({id: card});
      board = card.board();
    }else{
      board = card.board();
    }
    this.openBoard(board);
    new CardShowView({model: card});
  },
  renderBoard: function(board){
    new BoardItemView({model: board});
  },
  renderList: function(list){
    new ListItemView({model: list});
    this.renderCards(list);
  },
  renderCard: function(card){
    new CardItemView({model: card});
  },
  renderBoards: function(){
    this.boards.each(this.renderBoard);
  },
  renderLists: function(board){
    this.lists.where({board_id: board.id}).forEach(this.renderList.bind(this));
  },
  renderCards: function(list){
    this.cards.where({list_id: list.id}).forEach(this.renderCard.bind(this));
  },
  createBoard: function(new_name){
    var self = this;
    this.boards.create({name: new_name, rank: this.boards.rank},
      {
      success: function(response){
        self.renderBoard(response);
      }
    });
    this.boards.rank++;
  },
  createList: function(board, name){
    var self = this;
    this.lists.create({
      name: name, 
      board_id: board.id,
      rank: board.next_list_rank
    }, {
      success: function(response){
        self.renderList(response);
      }
    });
    board.next_list_rank++;
  },
  createCard: function(list, name){
    var self = this;
    this.cards.create({
      name: name, 
      list_id: list.id,
      board_id: list.get('board_id'),
      rank: list.next_card_rank
    }, {
      success: function(response){
        self.renderCard(response);
      }
    });
    list.next_card_rank++;
  },
  deleteBoard: function(board){
    this.lists.where({board_id: board.id}).forEach(this.deleteList.bind(this));
    board.destroy();
  },
  deleteList: function(list){
    this.cards.where({list_id: list.id}).forEach(this.deleteCard.bind(this));
    list.destroy();
  },
  deleteCard: function(card){
    card.destroy();
  },
  updateRank: function(model, new_position){
    var collection = model.collection,
        pos = new_position >= collection.length ? collection.length - 1 : new_position,
        position = collection.length - 1 - pos;

    collection.remove(model);

    collection.each(function(item, index){
      if (index < position){
        item.save({rank: index + 1});
      }else{item.save({rank: index + 2});}
    });

    model.set('rank', position + 1);
    collection.create(model);
  },
  moveCardList: function(old_list, new_list, card, new_position){
    card.save({list_id: new_list.id, rank: new_list.next_card_rank});
    this.updateRank(card, new_position);
  },
  bind: function(){
    _.extend(this, Backbone.Events);
    this.listenTo(this.navView, 'searching', this.showSearchResults);
  },
  showSearchResults: function(text){
    if (this.searchView){
      this.searchView.destroy();
    }
    this.searchView = new SearchView({
      cards: this.cards.search(text).map(function(item){return item.toJSON();}),
      lists: this.lists.search(text).map(function(item){return item.toJSON();}),
      boards: this.boards.search(text).map(function(item){return item.toJSON();})
    });
    this.listenTo(this.searchView, 'open_board', this.openBoard);
    this.listenTo(this.searchView, 'open_list', this.openList);
    this.listenTo(this.searchView, 'open_card', this.openCard);
  },
  fetchData: function(){
    //fetches stored data and updates internal rank counter
    var self = this;
    this.boards.fetch({
      reset: true,
      success: function(response){
        response.each(function(board){
          response.rank = response.rank <= board.get('rank') ? board.get('rank') + 1 : response.rank;
        });
      }
    });

    this.lists.fetch({
      reset: true,
      success: function(response){
        response.each(function(list){
          var board = self.boards.findWhere({id: list.get('board_id')});
          board.next_list_rank = board.next_list_rank <= list.get('rank') ? list.get('rank') + 1 : board.next_list_rank;
        });
      }
    });

    this.cards.fetch({
      reset: true,
      success: function(response){
        response.each(function(card){
          var list = self.lists.findWhere({id: card.get('list_id')});
          list.next_card_rank = list.next_card_rank <= card.get('rank') ? card.get('rank') + 1 : list.next_card_rank;
        });
      }
    });
  },
  init: function(){
    this.boards = new Boards();
    this.lists = new Lists();
    this.cards = new Cards();
    this.fetchData();
    this.navView = new LayoutView();
    // this.indexView();
    this.bind();
  }
};

Handlebars.registerHelper("getCardBoard", function(card){
  return App.boards.findWhere({id: card.board_id}).get('name');
});

Handlebars.registerHelper("getCardList", function(card){
  return App.lists.findWhere({id: card.list_id}).get('name');
})