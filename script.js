//TODO: lag en date som øker med en dag hver gang progress bar er 100%
const allPersons = document.getElementById("allPersons");
let options = ["Work", "Education", "Gamble", "Socialise"]

let date = new Date();
showDate();
startTimer();

function addPerson() {
	let person = new Person("tinus");
	const div = document.createElement("div");
	div.className = "person col-xs-3";

	const h4 = document.createElement("h4");
	h4.innerHTML = person.name;

	const select = document.createElement("select");
	select.className = "form-control";

	for (var i = 0; i < options.length; i++) {
		const option = document.createElement("option");
		option.innerHTML = options[i];
		select.appendChild(option);
	}

	div.appendChild(h4);
	div.appendChild(select);
	allPersons.appendChild(div);
}

function updateValues() {
	
}

class Person {
	constructor(name) {
		//TODO lag startverdier random;
		this.name = name;
		this.age = 0;
		this.money = 0;
		this.intelligence = 0;
		this.happiness = 0;
		this.gender = "male";
		this.birthday = "21.10.2017" //få tak i dagen i dag.
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
