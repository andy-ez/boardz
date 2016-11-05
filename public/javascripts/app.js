var App = {
  $el: $('body'),
  templates: JST,
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
    board.lists.each(this.renderList.bind(this));
  },
  renderCards: function(list){
    list.cards.each(this.renderCard);
  },
  createBoard: function(new_name){
    var self = this;
    this.boards.create({name: new_name.trim(), rank: this.boards.rank},
      {
      success: function(response){
        self.renderBoard(response);
      }
    });
    this.boards.rank++;
  },
  createList: function(board, name){
    var self = this;
    board.lists.create({
      name: name, 
      board: board,
      rank: board.lists.rank
    }, {
      success: function(response){
        self.renderList(response);
      }
    });
    board.lists.rank++;
  },
  createCard: function(list, name){
    var self = this;
    list.cards.create({
      name: name, 
      list: list,
      board: list.board,
      rank: list.cards.rank
    }, {
      success: function(response){
        self.renderCard(response);
      }
    });
    list.cards.rank++;
  },
  deleteBoard: function(board){
    board.destroy();
  },
  deleteList: function(list){
    list.destroy();
  },
  deleteCard: function(card){
    card.destroy();
  },
  validBoardName: function(new_name){
    return this.boards.validName(new_name);
  },
  validListName: function(board, new_name){
    return board.validListName(new_name);
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
    var a = card.clone();
    card.destroy();
    console.log(old_list.cards.toJSON())
    var collection = new_list.cards,
        pos = new_position >= collection.length ? collection.length - 1 : new_position,
        position = collection.length - 1 - new_position;

    collection.each(function(item, index){
      if (index < position){
        item.save({rank: index + 1});
      }else{item.save({rank: index + 2})}
    })
    console.log(collection.toJSON());
    a.set('rank', position + 1);
    collection.create(a);
    console.log(collection.toJSON());
    new_list.board.save();
  },
  bind: function(){
    _.extend(this, Backbone.Events);
  },
  init: function(){
    this.boards = new Boards();
    this.boards.fetchAll();
    this.layout = new LayoutView();
    this.indexView();
  }
}