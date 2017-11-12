var randomWord = require('random-word');
var Letter = require("./Letter");

var createArrayOfLetters = function(selectedWord){
	letterArray = [];
	for (var i = 0; i < selectedWord.length; i++){
		// each letter becomes a letter object
		letterArray.push(new Letter(selectedWord[i]));
	}
	return letterArray
}

// Constructor creates a word object when called
function Word(){

	this.selectedWord = randomWord();

	this.letters = createArrayOfLetters(this.selectedWord);

	this.contains = function(letter){
		for (var i = 0; i < this.letters.length; i++){
			if (letter === this.letters[i].letter){
				return true
			}
		}
		// if the letter is not contained in the word, return false
		return false
	};

	this.output = function(lettersUsed){
		// go through all the letters in the lettersUsed Array
		// call letter.output
		var output = ""

		for (var i = 0; i < this.letters.length; i++){
			output += this.letters[i].output(lettersUsed)
		}
		return output
	}
}

module.exports = Word;