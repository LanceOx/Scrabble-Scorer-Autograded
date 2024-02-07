// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	   word = word.toUpperCase();
	   let letterPoints = "";
 
	      for (let i = 0; i < word.length; i++) {
 
	         for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		}
    } 
  }
	return letterPoints;
}


 function simpleScorer(word){
      word = word.toUpperCase();
      let score = 0;

         for (let i = 0; i < word.length; i++) {
       // Check if the character is a letter
      if (word[i] >= 'A' && word[i] <= 'Z') {
         score += 1;
      }
   }
   return score;
}

function vowelBonusScorer(word) {
      word = word.toUpperCase();
      let score = 0;
      let vowels = ['A', 'E', 'I', 'O', 'U'];

         for (let i = 0; i < word.length; i++){
         if (vowels.includes(word[i])) {
            score += 3;
      } else if (word[i] >= 'A' && word[i] <= 'Z'){
         score += 1
      }
   }
   return score;
}
   function scrabbleScorer(word) {
//       word = word.toUpperCase();
//       let score = 0;

//        for (let letter in word) {
//          if (letter >= 'A' && letter <+ 'Z'){
//             score += 1;
//          }
//        }
//        return score;
// }
      word = word.toUpperCase();
      let score = 0;
  
      for (let letter of word) {
          if (newPointStructure.hasOwnProperty(letter)) {
              score += newPointStructure[letter];
          }
      }
  
      return score;
  }
  

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble! \nEnter a word: ");
};

const scoringAlgorithms = [
      { 
         name: "Old Scrabble Scorer", 
         description: "The traditional scrabble scorer ",
         scoreFunction: scrabbleScorer 
      },
      {
          name: "Simple Scorer",
          description: "Each letter is worth 1 point ", 
          scoreFunction: simpleScorer 
      },
      { 
         name: "Bonus Vowel Scorer", 
         description: "Each vowel is worth 3pts and consonants are worth 1pt ", 
         scoreFunction: vowelBonusScorer
       }
   ];


function scorerPrompt() {
   console.log("Choose a scoring algorithm:");

      for (let i = 0; i < scoringAlgorithms.length; i++) {
          console.log(`${i}. ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
      }
            let choice = parseInt(input.question("Enter the number of which scoring algorithm you desire: "))
      
            if (choice >= 0 && choice < scoringAlgorithms.length) {
         return scoringAlgorithms[choice];
      } else {
            console.log("Please choose a valid number: ");
            return scorerPrompt();
      }
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure) {
       let letters = oldPointStructure[pointValue];
       for (let i = 0; i < letters.length; i++) {
           let letter = letters[i].toLowerCase();
           newPointStructure[letter] = parseInt(pointValue);
       }
   }
   return newPointStructure;
}


let newPointStructure = transform(oldPointStructure);

function runProgram() {
  const word = initialPrompt();
  const selectedScorer = scorerPrompt();
  const scoreFunction = selectedScorer.scoreFunction;
  let score = scoreFunction(word);
      console.log(`Scoring Algorithm: ${selectedScorer.name}`);
      console.log(`Description: ${selectedScorer.description}`)
      console.log(`Score for ${word}: ${score}`);

}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
