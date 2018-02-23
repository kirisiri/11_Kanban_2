function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	}

$(function() { 

	function Board(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createBoard();

		function createBoard(){
			var $board = $('<div>').addClass('board');
			var $boardTitle = $('<h2>').addClass('board-title').text(self.name);
			var $boardAddColumn = $('<button>').addClass('create-column').text('Create a column');
			$boardAddColumn.click(function() {
				self.addColumn(new Column(prompt("Enter the name of the column")));
			});
			$board.append($boardTitle)
        			.append($boardAddColumn)
			return $board;
			initSortable();
		}
	}	
	Board.prototype = {
			addColumn: function(column) {
      		this.$element.append(column.$element);
      		//initSortable();
    		}
	};	
	

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name; 
		this.$element = createColumn();

		function createColumn(){
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('usun');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
			$columnDelete.click(function() {
        			self.removeColumn();
			});
			$columnAddCard.click(function() {
        			self.addCard(new Card(prompt("Enter the name of the card")));
			});
			$column.append($columnTitle)
        			.append($columnDelete)
        			.append($columnAddCard)
        			.append($columnCardList); 
			return $column;
		}
	}
	Column.prototype = {
    		addCard: function(card) {
      			this.$element.children('ul').append(card.$element);
    		},
    		removeColumn: function() {
     			this.$element.remove();
   			}
	};
	
	function Card(description) {
		var self = this;

    	this.id = randomString();
    	this.description = description;
    	this.$element = createCard();

    	function createCard() {
    		var $card = $('<li>').addClass('card');
    		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    		var $cardDelete = $('<button>').addClass('btn-delete').text('x');
    		
    		$cardDelete.click(function(){
        			self.removeCard();
			});
			$card.append($cardDelete)
	 				.append($cardDescription);
				return $card;
		}
    }
    Card.prototype = {
				removeCard: function() {
					this.$element.remove();
				}
	}	
	var boardGenerator = {
  		name: 'Kanban Generator',
   		addBoard: function(board) {
      		this.$element.append(board.$element);
      		//initSortable(); - dodac do board potem
    	},
    	$element: $('#boardGenerator .boards-container')
	};	

	function initSortable() {
    	$('.column-card-list').sortable({
    		connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'
    	}).disableSelection();
  	} 
  	$('.create-board').click(function(){
			var name = prompt('Enter a board name');
			var board = new Board(name);
    			boardGenerator.addBoard(board);
  	}); 


	/*var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	todoColumn.addCard(card1);
	doingColumn.addCard(card2); */
});

