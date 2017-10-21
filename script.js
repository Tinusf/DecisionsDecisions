//TODO: lag en date som øker med en dag hver gang progress bar er 100%
const allPersons = document.getElementById("allPersons");
let options = ["Education", "Work", "Gamble", "Socialise"]
let persons = [];
let personToMakeKidsWith;
let savingEnabled = true;

let date = new Date();
startTimer(5);
checkStorage();
appendTextConsole("Welcome to Decisions Decisions.");
loadProgress();
showDate();

function addPerson() {
	const chosenName = prompt("Please enter your name", "Tinus"); //TODO: si hva slags kjønn det ble og endre farge ved forskjellig kjønn. ha en "other" kjønn?
	if (chosenName == null) {
		return;
	}
	let person = new Person(chosenName);
	const randomNumber = Math.floor(Math.random() * 2);
	if (randomNumber == 0) {
		person.gender = "male";
	} else {
		person.gender = "female";
	}
	person.birthday = new Date(date.valueOf()).getTime();
	persons.push(person);
	makePersonDiv(person);
}

function makePersonDiv(person) {
	const personInfoChangable = ["Money", "Intelligence", "Happiness", "Age"];
	
	const div = document.createElement("div");
	div.className = "person col-lg-2 col-md-3 col-sm-4 col-xs-12";

	if (person.gender == "male") {
		div.className += " male";
	} else {
		div.className += " female";
	}

	person.div = div;

	const h4 = document.createElement("h4");
	const h4Text = document.createTextNode(person.name);
	h4.appendChild(h4Text);
	div.appendChild(h4);

	const genderP = document.createElement("p");
	const genderText = document.createTextNode("Gender: " + person.gender);
	genderP.appendChild(genderText);
	div.appendChild(genderP);

	const birthdayP = document.createElement("p");
	const birthdayDate = new Date(parseInt(person.birthday, 10));
	const birthdayText = document.createTextNode("Birthday: " + birthdayDate.toLocaleDateString("nb-NO"));
	birthdayP.appendChild(birthdayText);
	div.appendChild(birthdayP);

	for (let i = 0; i < personInfoChangable.length; i++) {
		const p = document.createElement("p");
		pText = document.createTextNode(personInfoChangable[i] + ": ");
		p.appendChild(pText);
		div.appendChild(p);
	}

	const select = document.createElement("select");
	select.className = "form-control";

	for (var i = 0; i < options.length; i++) {
		const option = document.createElement("option");
		optionText = document.createTextNode(options[i]);
		option.appendChild(optionText);
		select.appendChild(option);
	}
	div.appendChild(select);

	const buttonSuicide = document.createElement("button");
	buttonSuicide.className = "btn btn-danger";
	buttonSuicide.onclick = function () { killSelf(person); };
	const buttonSuicideText = document.createTextNode("Kill yourself.");
	buttonSuicide.appendChild(buttonSuicideText);
	div.appendChild(buttonSuicide);

	const buttonMakeKids = document.createElement("button");
	buttonMakeKids.className = "btn btn-primary";
	buttonMakeKids.onclick = function () { makeKids(person); };
	const buttonMakeKidsText = document.createTextNode("Make kids.");
	buttonMakeKids.appendChild(buttonMakeKidsText);
	div.appendChild(buttonMakeKids);
	
	allPersons.appendChild(div);
	updateValueForPerson(person, 0);
	appendTextConsole("You have added a new person: " + person.name);
}

function makeKids(person) {
	if (personToMakeKidsWith == null) {
		personToMakeKidsWith = person;
		if (person.gender == "male") {
			//TODO: lag kulere alert med bootstrap tingen.
			appendTextConsole(person.name + " chosen, please choose a female to mate with.")
		} else {
			appendTextConsole(person.name + " chosen, please choose a male to mate with.")
		}
	} else {
		if (person.gender != personToMakeKidsWith.gender) {
			appendTextConsole("Successfully made a kid.")
			addPerson();
		} else {
			appendTextConsole("Sorry that is impossible.")
		}
		personToMakeKidsWith = null;
	}
}

function killSelf(person) {
	appendTextConsole("This is incredibly sad, " + person.name + " just took " + hisOrHer(person) + " life.");
	i = persons.indexOf(person);
	delete persons[i];
	person.div.remove();
}

function isAdult(person) {
	return calculateAge(person) >= 18;
}

function updateValueForPerson(person, daysChanged) {
	const childNodes = person.div.childNodes;
	const activity = childNodes[7].value;
	const adult = isAdult(person);
	if (daysChanged > 0) {
		switch(activity) {
			case "Education": {
				calculateEdu(person, daysChanged);
				break;
			}
			case "Work": {
				calculateWork(person, daysChanged);
				break;
			}
			case "Gamble": {
				calculateGamble(person, daysChanged);
				break;
			}
			case "Socialise": {
				calculateSocialise(person, daysChanged);
				break;
			}
			default:
				break;
		}
	}

	childNodes[3].innerHTML = "Money: " + person.money + "$";
	childNodes[4].innerHTML = "Intelligence: " + person.intelligence;
	childNodes[5].innerHTML = "Happiness: " + person.happiness;
	childNodes[6].innerHTML = "Age: " + calculateAge(person);
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

function calculateEdu(person, daysChanged) {
	const age = calculateAge(person);
	let randomNumber = 0;
	let outputString = "";
	intelligenceRnd = Math.floor(Math.random() * 2);
	happinessRnd = Math.floor(Math.random() * 2);
	if (age < 6) {
		outputString = "Little " + person.name + " went to kindergarden";
	} else if (age < 13) {
		outputString ="The young " + person.name + " went to elementary school";
	} else if (age < 16) {
		outputString = "The teen " + person.name + " went to middle school";
	} else if (age < 19) {
		outputString = "The young adult " + person.name + " went to high school";
	} else {
		outputString = "The wise " + person.name + " went to university";
		moneyRnd = Math.floor(Math.random() * 2);
		if (moneyRnd > 0) {
			outputString += ", lost some money";
			person.money -= moneyRnd;
		}
	}

	if (intelligenceRnd > 0) {
		outputString += " and gained some intelligence";
		person.intelligence += daysChanged * intelligenceRnd;
	}
	if (happinessRnd > 0) {
		outputString += " and had fun";
		person.happiness += daysChanged * happinessRnd;
	}
	outputString += ".";
	appendTextConsole(outputString);
}

function calculateWork(person, daysChanged) {
	if (isAdult(person)) {
		let intelligenceRnd = 0;
		let happinessRnd = 0;
		let moneyRnd = 0;
		const wordToUse = heOrShe(person);
		if (person.intelligence < 3500) {
			appendTextConsole(person.name + " goes to work at McDonald " + wordToUse + " feels that " + wordToUse + " is getting dumber every day.");
			intelligenceRnd = -Math.floor(Math.random() * 2);
			moneyRnd = Math.floor(Math.random() * 2) +1;
			happinessRnd = -Math.floor(Math.random() * 2) + 1;
		} else if (person.intelligence < 5000) {
			appendTextConsole(person.name + " goes to work as a life guard, it is alright.");
			moneyRnd = Math.floor(Math.random() * 2) +1;
		} else if (person.intelligence < 6000) {
			appendTextConsole(person.name + " goes to work as a programmer, " + wordToUse + " loves it.");
			moneyRnd = Math.floor(Math.random() * 5) +1;
			happinessRnd = Math.floor(Math.random() * 2) + 1;
		}
		person.intelligence += intelligenceRnd * daysChanged;
		person.money += moneyRnd * daysChanged;
		person.happiness += happinessRnd * daysChanged;
	} else {
		appendTextConsole(person.name + " tried to get a job, but noone wants to hire him.");
	}
}

function calculateGamble(person, daysChanged) {
	if (isAdult(person)) {
		const wordToUse = heOrShe(person);
		const randomNumber = Math.floor(Math.random() * 30);
		let moneyLostOrGained = 0;
		if (person.money < 10) {
			appendTextConsole(person.name + " just got kicked out of the casino " + wordToUse + " doesn't even have 10$, " + wordToUse + " is now sad.");
			person.happiness -= 10 * daysChanged;
		}
		else if (randomNumber == 0) {
			appendTextConsole("I can't believe it, " + person.name + " actually won money at the casino.");
			person.happiness += 200 * daysChanged;
			moneyLostOrGained = 200;
		} else {
			appendTextConsole(person.name + " tried to gamble and expectedly lost.");
			moneyLostOrGained = -10;
			person.happiness -= 1 * daysChanged;
		}
		person.money += moneyLostOrGained * daysChanged;
	} else {
		const finedAmount = -Math.floor(Math.random() * 100) + 1;
		appendTextConsole(person.name + " tried to get into a casino whilst underage and got fined" + finedAmount + "$");
		person.money += finedAmount * daysChanged;
	}
}

function calculateSocialise(person, daysChanged) {

}

function updateValues(daysChanged) {
	persons.forEach(function(element) {
		updateValueForPerson(element, daysChanged);
	});
}

class Person {
	constructor(name) {
		//TODO lag startverdier random;
		this.name = name;
		this.money = 0;
		this.intelligence = 0;
		this.happiness = 0;
		this.gender;
		this.birthday;
		this.div;
	}
}

function calculateAge(person) {
	const nowYear = date.getFullYear();
	const birthdayDate =  new Date(parseInt(person.birthday, 10));
	const pastYear = birthdayDate.getFullYear();
	const age = nowYear - pastYear;
	return age;
}

function showDate() {
	const dateH4 = document.getElementById("date");
	dateH4.innerHTML = date.toLocaleDateString("nb-NO");
}
function nextDay() {
	date.setDate(date.getDate() + 1);
	showDate();
	updateValues(1);
	saveProgress();
}

function startTimer(secondsInADay) {
	let bar = document.getElementById("progress");
	time = 0;
	max = secondsInADay;
	int = setInterval(function() {
		if (time - 1 == max) {
			nextDay();
			time = 0;
		} else {
			bar.style.width = Math.floor(100 * time++ / max) + '%';
		}
	}, 1000);
}

function appendTextConsole(text) {
	const console = document.getElementById("console");
	console.value += text + "\n";
	console.scrollTop = console.scrollHeight;
}

function hax() {
	date.setDate(date.getDate() + 365);
	showDate();
	updateValues(365);
}

function checkStorage() {
	if (typeof(Storage) === "undefined") {
		appendTextConsole("You cannot save your progress.");
		savingEnabled = false;
	}
}

function saveProgress() {
	localStorage.setItem("date", date.getTime());

	localStorage.setItem("persons", JSON.stringify(persons));
}
function loadProgress() {
	const loadedDate = localStorage.getItem("date");
	if (loadedDate !== null) {
		appendTextConsole("Loaded date from file.");
		date = new Date(parseInt(localStorage["date"], 10));
	} else {
		appendTextConsole("Could not find date file.");
	}

	let loadedPersons = localStorage.getItem("persons");
	if (loadedPersons != null) { // Hvis du aldri har lagret noe.
		loadedPersons = loadedPersons.replace(new RegExp(",null", 'g'), "");
		loadedPersons = loadedPersons.replace(new RegExp("null,", 'g'), "");
		appendTextConsole("Loaded persons from file.");
		if (loadedPersons != "[null]") { // Hvis du noen gang har lagret en null.
			persons = JSON.parse(loadedPersons);
			persons.forEach(function(element) {
				makePersonDiv(element);
			});
		}
	} else {
		appendTextConsole("Could not find persons file.");
	}
}

function deleteProgress() {
	localStorage.removeItem("date");
	localStorage.removeItem("persons");
	location.reload();
}