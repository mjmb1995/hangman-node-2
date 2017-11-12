// requiring dependencies
var inquirer = require("inquirer");
var Word = require("./Word");

var lettersUsed = [];

// Selecting the word object to use for the game
var word = new Word();

// User gets 10 guesses
var livesLeft = 10;


//user input to start game
inquirer.prompt([{
		type: "confirm",
		message: "Want to play a game of Hangman?",
		name: "ready"
	}]).then(function(answer) {
		//if yes, start game
		if (answer.ready) {
			console.log("I hope you're ready!");
			startGame();
		} else {
			console.log("Hope you come back soon!");
		}
	});

function startGame() {
	console.log(word.output(lettersUsed));
	inquirer.prompt([{
			type: "input",
			message: "Type a letter to guess",
			name: "letter"
		}]).then(function(answer) {
			// when letter guessed again tell user they can not use it again
			if (lettersUsed.indexOf(answer.letter) > -1) {
				console.log("You already used that letter. Try again..");
				startGame();
				return
			}

			lettersUsed.push(answer.letter);
			
			// this checks every letter in the used array vs. the word object
			if (word.output(lettersUsed) === word.selectedWord) {
				console.log("Great job! The word was: " + word.selectedWord);
				console.log("That was too easy.\nThis time you only have 5 guesses.")

				// resets the game
				// resets the used letters array
				lettersUsed = [];
				//selects a new word
				word = new Word();
				// this time user will only have 5 guesses
				livesLeft = 5;
				startGame();
				return

			} else {
				// lose a guess if the letter is not in the word
				if (!word.contains(answer.letter)) {
					livesLeft -= 1
				}

				// lose the game when user runs out of guesses
				if (livesLeft === 0) {
					console.log("That was too bad, you ran out of guesses. The word was: " + word.selectedWord);
					// user can play again with 10 guesses
					console.log("If you play again, I will give you 10 guesses!");
					// ask user if they want to play again
					inquirer.prompt([{
							type: "confirm",
							message: "Would you like to try again?",
							name: "continue"
						}])
						.then(function(answer){
							if (answer.continue) {
								//resets game variables
								lettersUsed = []
								word = new Word()
								guessesLeft = 10
								startGame()
								return
							} else {
								console.log("Feel free to come back at any time!")
							}
						})
				} else {
					console.log("You have " + livesLeft + " guesses left!");
					startGame();
				}
			}

		})
}