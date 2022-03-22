// get player choice
const action = document.querySelectorAll('.action');

// show choice
const showChoice = document.querySelectorAll('.show-choice');
const showPlayerChoice = showChoice[0];
const showComputerChoice = showChoice[1];

// score
const score = document.querySelectorAll('.score');
const scorePlayer = score[0];
const scoreComputer = score[1];

const condition = document.querySelector('.vs');
const resetBtn = document.getElementById('reset');

// player choice button click
// button action
action.forEach((action) => {
	action.addEventListener('click', function () {
		// get and store button id
		let actionId = action.getAttribute('id');
		// show which button is clicked
		showPlayerChoice.textContent = actionId;
		// call inputHandler function
		inputHandler(actionId);
		// remove reset button disabled class
		resetBtn.classList.remove('disabled');
	});
});

// handle input (button)
const inputHandler = function (action) {
	// call and store computerChoice function
	let computer = computerChoice();
	// call and store winCondition function
	let result = winCondition(action, showComputerChoice.textContent);
	// call addScore function
	addScore(result);
	// call battleHistory function
	battleHistory(action, result, computer);
	// show the result whether win, lose or draw
	condition.textContent = result;
};

// computer action randomly generate
function computerChoice() {
	// generate random number from 0 to 2
	const computer = Math.round(Math.random() * 2);
	// assign rock, paper and scissor
	if (computer == 0) {
		showComputerChoice.textContent = 'rock';
		return 'rock';
	} else if (computer == 1) {
		showComputerChoice.textContent = 'paper';
		return 'paper';
	} else {
		showComputerChoice.textContent = 'scissor';
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
		scoreComputer.textContent;
		scorePlayer.textContent;
	}
	// display the score
	scorePlayer.textContent = player;
	scoreComputer.textContent = computer;
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
const logContainer = document.querySelector('.battle-history');
function battleHistory(player, result, computer) {
	let div = document.createElement('div');
	div.className = 'row row-cols-3 justify-content-center text-muted log-item ';
	// store player choices column element
	const col1 = createPlayerCol(player);
	// store result column element
	const col2 = createResultCol(result);
	// store computer choices column element
	const col3 = createComputerCol(computer);

	logContainer.appendChild(div);
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
resetBtn.addEventListener('click', function () {
	// call reset
	resetScore();
	// remove div alement that contains battle history
	while (logContainer.hasChildNodes()) {
		logContainer.removeChild(logContainer.firstChild);
	}
	// add disabled class
	this.className += ' disabled';
});

// reset value in the game
function resetScore() {
	// set the score to 0
	player = 0;
	computer = 0;
	for (let i = 0; i < 2; i++) {
		score[i].textContent = 0;
		// set choices display
		showChoice[i].textContent = '';
	}
	// set the view result back
	condition.textContent = 'vs';
}
