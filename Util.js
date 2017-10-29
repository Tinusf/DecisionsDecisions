function randomFiftyFifty() {
	if (Math.floor(Math.random() * 2) === 0) {
		return true;
	}
	return false;
}

function isAdult(person) {
	return person.age >= 18;
}

function heOrShe(person) {
	let wordToUse;
	if (person.gender == "male") {
		wordToUse = "he";
	} else {
		wordToUse = "she";
	}
	return wordToUse;
}

function hisOrHer(person) {
	let wordToUse;
	if (person.gender == "male") {
		wordToUse = "his";
	} else {
		wordToUse = "her";
	}
	return wordToUse;
}

function himselfOrHerself(person) {
	let wordToUse;
	if (person.gender == "male") {
		wordToUse = "himself";
	} else {
		wordToUse = "herself";
	}
	return wordToUse;
}


function hax() {
	date.setDate(date.getDate() + 365);
	showDate();
	updateValues(365);
}