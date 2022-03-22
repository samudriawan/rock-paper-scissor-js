// player choice button click
// button action
$(function () {
	$('.action').each(function () {
		$(this).click(function () {
			// get and store button id
			let actionId = $(this).attr('id');
			// show which button is clicked
			$('.player-stat .show-choice').text(actionId);
			// call inputHandler function
			inputHandler(actionId);
			// remove reset button disabled class
			$('#reset').removeClass('disabled');
		});
	});
});

// show choice
const showPlayerChoice = $('.player-stat .show-choice');
const showComputerChoice = $('.computer-stat .show-choice');

// score
const scorePlayer = $('.player-stat .score');
const scoreComputer = $('.computer-stat .score');

// handle input (button)
const inputHandler = function (action) {
	// call and store computerChoice function
	let computer = computerChoice();
	// call and store winCondition function
	let result = winCondition(action, $('.computer-stat .show-choice').text());
	// call addScore function
	addScore(result);
	// call battleHistory function
	battleHistory(action, result, computer);
	// show the result whether win, lose or draw
	$('.vs').text(result);
};

// computer action randomly generate
function computerChoice() {
	// generate random number from 0 to 2
	const computer = Math.round(Math.random() * 2);
	// assign rock, paper and scissor
	if (computer == 0) {
		showComputerChoice.text('rock');
		return 'rock';
	} else if (computer == 1) {
		showComputerChoice.text('paper');
		return 'paper';
	} else {
		showComputerChoice.text('scissor');
		return 'scissor';
	}
}

// add score based on winCondition value
let player = 0;
let computer = 0;
// increment score based on who is win
const addScore = function (win) {
	// if player win increment player score by 1
	if (win == 'Win') {
		player++;
	}
	// if computer win increment player score by 1
	if (win == 'Lose') {
		computer++;
	}
	// if draw do not increment score
	if (win == 'Draw') {
		scoreComputer.text();
		scorePlayer.text();
	}
	// display the score
	scorePlayer.text(player);
	scoreComputer.text(computer);
};

// check if the player win, lose or draw
function winCondition(player, computer) {
	if (player == 'rock' && computer == 'paper') {
		// computer win;
		// return false;
		return 'Lose';
	}
	if (player == 'rock' && computer == 'scissor') {
		// player win;
		// return true;
		return 'Win';
	}
	if (player == 'paper' && computer == 'rock') {
		// player win;
		// return true;
		return 'Win';
	}
	if (player == 'paper' && computer == 'scissor') {
		// computer win;
		// return false;
		return 'Lose';
	}
	if (player == 'scissor' && computer == 'rock') {
		// computer win;
		// return false;
		return 'Lose';
	}
	if (player == 'scissor' && computer == 'paper') {
		// player win;
		// // return true;
		return 'Win';
	}
	// return null;
	return 'Draw';
}

// create div element that contains battle log
function battleHistory(player, result, computer) {
	let div = document.createElement('div');
	div.className = 'row row-cols-3 justify-content-center text-muted log-item ';

	// store player choices column element
	const col1 = createPlayerCol(player);
	// store result column element
	const col2 = createResultCol(result);
	// store computer choices column element
	const col3 = createComputerCol(computer);

	$('.battle-history').append(div);
	div.appendChild(col1);
	div.appendChild(col2);
	div.appendChild(col3);
}

// create div column element contains the player choices
function createPlayerCol(player) {
	let div = document.createElement('div');
	div.className = 'col-3 text-center text-capitalize';
	div.textContent = player;
	return div;
}
// create div column element contains the result
function createResultCol(result) {
	let div = document.createElement('div');
	div.className = 'col-2 text-center';
	div.textContent = result;
	return div;
}
// create div column element contains the computer choices
function createComputerCol(computer) {
	let div = document.createElement('div');
	div.className = 'col-3 text-center text-capitalize';
	div.textContent = computer;
	return div;
}

// reset button action
$('#reset').click(function () {
	// call reset
	resetScore();
	// remove div alement that contains battle history
	if ($('.battle-history').children().length > 0) {
		$('.battle-history').children().remove();
	}
	// add disabled class
	$(this).addClass(' disabled');
});

// reset value in the game
function resetScore() {
	// set the score to 0
	player = 0;
	computer = 0;
	$('.player-stat .score').text(0);
	$('.computer-stat .score').text(0);
	$('.player-stat .show-choice').text('');
	$('.computer-stat .show-choice').text('');
	// set the view result back
	$('.vs').text('vs');
}
