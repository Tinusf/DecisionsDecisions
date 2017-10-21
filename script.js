//TODO: lag en date som øker med en dag hver gang progress bar er 100%
const allPersons = document.getElementById("allPersons");
let options = ["Work", "Education", "Gamble", "Socialise"]
let persons = [];

let date = new Date();
showDate();
startTimer(5);

function addPerson() {
	const personInfoChangable = ["Money", "Intelligence", "Happiness", "Age"];
	const chosenName = prompt("Please enter your name", "Tinus"); //TODO: si hva slags kjønn det ble og endre farge ved forskjellig kjønn. ha en "other" kjønn?
	let person = new Person(chosenName);

	const div = document.createElement("div");
	div.className = "person col-sm-5 col-xs-12";

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
	const birthdayText = document.createTextNode("Birthday: " + date.toLocaleDateString("nb-NO"))
	birthdayP.appendChild(birthdayText);
	div.appendChild(birthdayP);
	person.birthday = new Date(date.valueOf());


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

	const button = document.createElement("button");
	button.className = "btn btn-danger";
	button.onclick = function () { killSelf(person); };

	const buttonText = document.createTextNode("Kill yourself.");
	button.appendChild(buttonText);
	div.appendChild(button);
	
	allPersons.appendChild(div);
	persons.push(person);
	updateValueForPerson(person);
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
	childNodes[6].innerHTML = "Age: " + person.getAge;
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
		this.gender = "male";
		this.birthday;
		this.div;
	}
	get getAge() {
		let nowYear = date.getFullYear();
		let pastYear = this.birthday.getFullYear();
		let age = nowYear - pastYear;
		return age;
	}
}

function showDate() {
	const dateH4 = document.getElementById("date");
	dateH4.innerHTML = date.toLocaleDateString("nb-NO");
}
function nextDay() {
	date.setDate(date.getDate() + 1);
	showDate();
	updateValues();
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

function hax() {
	date.setDate(date.getDate() + 365);
	showDate();
	updateValues();
}