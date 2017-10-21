//TODO: lag en date som øker med en dag hver gang progress bar er 100%
const allPersons = document.getElementById("allPersons");
let options = ["Work", "Education", "Gamble", "Socialise"]
let persons = [];

let date = new Date();
showDate();
startTimer();

function addPerson() {
	const personInfoChangable = ["Money", "Intelligence", "Happiness", "Age"];
	const chosenName = prompt("Please enter your name", "Tinus"); //TODO: si hva slags kjønn det ble og endre farge ved forskjellig kjønn. ha en "other" kjønn?
	let person = new Person(chosenName);

	const div = document.createElement("div");
	div.className = "person col-xs-3";

	person.div = div;

	const h4 = document.createElement("h4");
	h4.innerHTML = person.name;
	div.appendChild(h4);

	const genderP = document.createElement("p");
	genderP.innerHTML = "Gender: " + person.gender;
	div.appendChild(genderP);

	const birthdayP = document.createElement("p");
	birthdayP.innerHTML = "Birthday: " + date.toLocaleDateString("nb-NO"); 
	div.appendChild(birthdayP);
	person.birthday = new Date(date.valueOf());


	for (let i = 0; i < personInfoChangable.length; i++) {
		const p = document.createElement("p");
		p.innerHTML = personInfoChangable[i] + ": ";
		div.appendChild(p);
	}


	const select = document.createElement("select");
	select.className = "form-control";

	for (var i = 0; i < options.length; i++) {
		const option = document.createElement("option");
		option.innerHTML = options[i];
		select.appendChild(option);
	}

	
	div.appendChild(select);
	allPersons.appendChild(div);
	persons.push(person);
	updateValueForPerson(person);
}

function updateValueForPerson(person) {
	const childNodes = person.div.childNodes;
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
		console.log(date);
		console.log(this.birthday);
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

function startTimer() {
	let bar = document.getElementById("progress"),
	time = 0, max = 5,
	int = setInterval(function() {
		if (time - 1 == max) {
			nextDay();
			time = 0;
		} else {
			bar.style.width = Math.floor(100 * time++ / max) + '%';
		}
	}, 1000);
}
