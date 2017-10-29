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
	let gender;
	let chosenName;
	const randomNumber = Math.floor(Math.random() * 2);

	if (randomNumber == 0) {
		gender = "male";
		chosenName = prompt("Please name your new little boy", "Tinus");
	} else {
		gender = "female";
		chosenName = prompt("Please name your new little girl", "girlname");
	}
	if (chosenName == null) {
		return;
	}
	let person = new Person(chosenName, gender);

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
			if (person.age >= 16 && personToMakeKidsWith.age >= 16) {
				appendTextConsole("Successfully made a kid.")
				addPerson();
			} else {
				appendTextConsole("Grow up kids.");
			}
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
	return person.age >= 18;
}

function updateValueForPerson(person, daysChanged) {
	calculateAge(person);
	const childNodes = person.div.childNodes;
	const activity = childNodes[7].value;
	if (daysChanged > 0) {
		const funcToRun = eval("calc" + activity + "(person, daysChanged)");
	}

	childNodes[3].innerHTML = "Money: " + person.money + "$";
	childNodes[4].innerHTML = "Intelligence: " + person.intelligence;
	childNodes[5].innerHTML = "Happiness: " + person.happiness;
	childNodes[6].innerHTML = "Age: " + person.age;
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

function updateValues(daysChanged) {
	persons.forEach(function(element) {
		updateValueForPerson(element, daysChanged);
	});
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
	console.value += "\n" + text;
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
