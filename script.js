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
updateValues();

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
	updateValueForPerson(person);
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
			personToMakeKidsWith = null;
		} else {
			appendTextConsole("Sorry that is impossible.")
		}
	}
}

function killSelf(person) {
	i = persons.indexOf(person);
	delete persons[i];
	person.div.remove();
}

function updateValueForPerson(person) {
	const childNodes = person.div.childNodes;
	
	/*const moneyText = document.createTextNode("Money: " + person.money);
	childNodes[3] = moneyText;

	const intText = document.createTextNode("Intelligence: " + person.intelligence);
	childNodes[4] = intText;

	const happyText = document.createTextNode("Happiness: " + person.happiness);
	childNodes[5] = happyText;

	const ageText = document.createTextNode("Age: " + person.getAge);
	childNodes[6] = ageText;*/ //TODO: fiks noe lignende slik og ikke bruk innerHTML.

	childNodes[3].innerHTML = "Money: " + person.money;
	childNodes[4].innerHTML = "Intelligence: " + person.intelligence;
	childNodes[5].innerHTML = "Happiness: " + person.happiness;
	childNodes[6].innerHTML = "Age: " + calculateAge(person);
}

function updateValues() {
	persons.forEach(function(element) {
		updateValueForPerson(element);
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
	updateValues();
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
	updateValues();
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

	const loadedPersons = localStorage.getItem("persons");
	if (loadedPersons !== null) {
		appendTextConsole("Loaded persons from file.");
		persons = JSON.parse(loadedPersons);

		persons.forEach(function(element) {
			makePersonDiv(element);
		});

	} else {
		appendTextConsole("Could not find persons file.");
	}
	

	//persons = localStorage.getItem("persons");
}

function deleteProgress() {

}