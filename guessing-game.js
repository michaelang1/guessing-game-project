const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let secretNumber = 50;
let numAttempts = 5;

const askGuess = () => {
	rl.question('Enter a guess: ', answer => {
		let guess = checkGuess(Number(answer));

		if (guess === true) {
			console.log('You win!');
			rl.close();
		} else {
			numAttempts--;
			if (numAttempts === 0) {
				console.log('You Lose');
				rl.close();
			} else {
				askGuess();
			}
		}
	});
};

const checkGuess = num => {
	if (num > secretNumber) {
		console.log('too high.');
		return false;
	} else if (num < secretNumber) {
		console.log('too low.');
		return false;
	} else if (num === secretNumber) {
		console.log('Correct!');
		return true;
	}
};

const randomInRange = (minimum, maximum) => {
	min = Math.ceil(minimum);
	max = Math.floor(maximum);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const askLimit = () =>
	rl.question('How many attempts are allowed? ', answer => {
		numAttempts = answer;
		askRange();
	});

const askRange = () => rl.question('Enter a max number: ', handleMaxAnswer);

const handleMaxAnswer = maxAnswer =>
	rl.question('Enter a min number: ', minAnswer => {
		console.log(
			`I'm thinking of a number between ${maxAnswer} and ${minAnswer}...`
		);

		secretNumber = randomInRange(Number(minAnswer), Number(maxAnswer));
		askGuess();
	});

askLimit();
