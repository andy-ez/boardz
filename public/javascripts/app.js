var App = {
  $el: $('body'),
  templates: JST,
  validateName: function(name){
    return (/\S/.test(name));
  },
  board_lists: function(board){
    return this.lists.where({board_id: board.id});
  },
  board_cards: function(board){
    return this.cards.where({board_id: board.id});
  },
  list_cards: function(list){
    return this.cards.where({list_id: list.id});
  },
  indexView: function(){
    if (this.main_view) {this.main_view.undelegateEvents();}
    this.main_view = new BoardsIndexView({collection: this.boards});
    this.renderBoards();
  },
  openBoard: function(board){
    this.main_view.undelegateEvents();
    this.main_view = new BoardShowView({model: board});
    this.renderLists(board);
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
      board_id: list.board_id,
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
      }else{item.save({rank: index + 2})}
    })

    model.set('rank', position + 1);
    collection.create(model);
  },
  moveCardList: function(old_list, new_list, card, new_position){
    card.save({list_id: new_list.id, rank: new_list.next_card_rank});
    this.updateRank(card, new_position);
  },
  bind: function(){
    _.extend(this, Backbone.Events);
  },
  fetchData: function(){
    //fetches stored data and updates internal rank counter
    var self = this;
    this.boards.fetch({
      reset: true,
      success: function(response){
        response.each(function(board){
          response.rank = response.rank <= board.get('rank') ? board.get('rank') + 1 : response.rank;
        })
      }
    });

    this.lists.fetch({
      reset: true,
      success: function(response){
        response.each(function(list){
          var board = self.boards.findWhere({id: list.get('board_id')});
          board.next_list_rank = board.next_list_rank <= list.get('rank') ? list.get('rank') + 1 : board.next_list_rank;
        })
      }
    });

    this.cards.fetch({
      reset: true,
      success: function(response){
        response.each(function(card){
          var list = self.lists.findWhere({id: card.get('list_id')});
          list.next_card_rank = list.next_card_rank <= card.get('rank') ? card.get('rank') + 1 : list.next_card_rank;
        })
      }
    });
  },
  init: function(){
    this.boards = new Boards();
    this.lists = new Lists();
    this.cards = new Cards();
    this.fetchData();
    this.layout = new LayoutView();
    this.indexView();
  }
}