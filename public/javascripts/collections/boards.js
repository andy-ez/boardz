var Boards = Backbone.Collection.extend({
  model: Board,
  localStorage: new Backbone.LocalStorage('boards'),
  rank: 1,
  initialize: function(){
  },
  // comparator: function(a, b) {
  //   return -a.get('name').localeCompare(b.get('name'));
  // },
  comparator: 'rank',
  validName: function(new_name){
    if (/\S/.test(new_name)) {
      return !this.findWhere({name: new_name});
    }else{
      return false;
    }
  },
  fetchAll: function(){
    var self = this;
    self.fetch({
      reset: true,
      success: function(){
        self.each(function(board){
          //update global rank
          self.rank = self.rank <= board.get('rank') ? board.get('rank') + 1 : self.rank;
          
          //fetch lists & cards
          board.lists.fetch({
            success: function(response){    
              response.each(function(list){
                board.lists.rank = board.lists.rank <= list.get('rank') ? list.get('rank') + 1 : board.lists.rank;
                list.cards.fetch({
                  reset: true,
                  suuccess: function(json){
                    json.each(function(card){
                      list.cards.rank = list.cards.rank <= card.get('rank') ? card.get('rank') + 1 : list.cards.rank;
                    })
                  }
                });

              })
            }
          });
        });
      }
    });
  }
});