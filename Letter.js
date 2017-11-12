// Constructor function using the user input

function Letter(letter){
	this.letter = letter

	this.output = function(lettersUsed){
		if (lettersUsed.indexOf(this.letter) > -1){
			//if this letter is in the lettersUsed array, return the letter
			return this.letter
		}
		// if not return blank
		return "_"
	}

}

// This is used in Word.js
module.exports = Letter;