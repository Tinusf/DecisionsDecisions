function updateLegalActivities(person) {
	legalActivities = []
	if (person.age < 2) {
		legalActivities.push("Kindergarten", "Cry", "Poop", "Crawl");
	} else if (person.age < 6) {
		legalActivities.push("Kindergarten", "Video Games", "Walk", "Annoy Parents");
	} else if (person.age < 13) {
		legalActivities.push("Elementary School", "Video Games", "Annoy Parents", "Stupid Shit");
	} else if (person.age < 16) {
		legalActivities.push("Middle School", "Socialise", "Video Games", "Annoy Parents", "Drugs", "Stupid Shit", "Criminal Activities");
	} else if (person.age < 19) {
		legalActivities.push("High School", "Work", "Socialise", "Video Games", "Annoy Parents", "Gamble", "Drugs", "Stupid Shit", "Criminal Activities");
	} else {
		legalActivities.push("Higher Education", "Work", "Socialise", "Video Games", "Gamble", "Drugs", "Stupid Shit", "Criminal Activities");
	}

	person.activities = legalActivities;
	updateActivitySelect(person);
}

function updateActivitySelect(person) {
	const select = person.div.childNodes[7];
	// TODO: Make this something other than just the 7'th element.
	while (select.hasChildNodes()) {
		select.removeChild(select.lastChild);
		// Remove all the old activities.
	}
	for (let i = 0; i < person.activities.length; i++) {
		const option = document.createElement("option");
		optionText = document.createTextNode(person.activities[i]);
		option.appendChild(optionText);
		select.appendChild(option);
	}
}

function activity(person, daysChanged) {

}

function calcKindergarten(person, daysChanged) {
	calcEducation(person, daysChanged);
}

function calcCrawl(person, daysChanged) {
	appendTextConsole("Little " + person.name + " is crawling around like a little baby.");
}

function calcCry(person, daysChanged) {
	appendTextConsole("Fantastic, " + person.name + " has been crying all day.");
}

function calcPoop(person, daysChanged) {
	appendTextConsole("Why doesn't " + person.name + " ever stop pooping? I don't understand. And why is " + heOrShe(person) + " happier?");
}

function calcWalk(person, daysChanged) {
	appendTextConsole(person.name + " is finally walking and " + heOrShe(person) + " is getting pretty good.");
}


function calcEducation(person, daysChanged) {
	let randomNumber = 0;
	let outputString = "";
	intelligenceRnd = Math.floor(Math.random() * 2);
	happinessRnd = Math.floor(Math.random() * 2);
	if (person.age < 6) {
		outputString = "Little " + person.name + " went to kindergarten";
	} else if (person.age < 13) {
		outputString ="The young " + person.name + " went to elementary school";
	} else if (person.age < 16) {
		outputString = "The teen " + person.name + " went to middle school";
	} else if (person.age < 19) {
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

function calcWork(person, daysChanged) {
	if (isAdult(person)) {
		let intelligenceRnd = 0;
		let happinessRnd = 0;
		let moneyRnd = 0;
		const wordToUse = heOrShe(person);
		if (person.intelligence < 3500) {
			appendTextConsole(person.name + " goes to work at McDonald's " + wordToUse + " feels that " + wordToUse + " is getting dumber every day.");
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
		} else {
			appendTextConsole(person.name + " goes to work as a university professor, " + wordToUse + " loves it.");
			moneyRnd = Math.floor(Math.random() * 4) +1;
			happinessRnd = Math.floor(Math.random() * 3) + 1;
			intelligenceRnd = Math.floor(Math.random() * 2);
		}
		person.intelligence += intelligenceRnd * daysChanged;
		person.money += moneyRnd * daysChanged;
		person.happiness += happinessRnd * daysChanged;
	} else {
		appendTextConsole(person.name + " tried to get a job, but noone wants to hire him.");
	}
}

function calcGamble(person, daysChanged) {
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
		appendTextConsole(person.name + " tried to get into a casino whilst underage and got fined " + -finedAmount + "$");
		person.money += finedAmount * daysChanged;
	}
}

function calcSocialise(person, daysChanged) {
	let outputString = "" ;

	let intelligenceRnd = 0;
	let happinessRnd = 0;
	let moneyRnd = 0;

	if (person.age < 5) {
		outputString = "Little " + person.name + " is playing and having fun.";
		happinessRnd = (Math.floor(Math.random() * 2) + 1);
	} else if (person.age < 13) {
		outputString = "The young " + person.name + " is socialising"
		if (Math.floor(Math.random() * 2) == 0) {
			outputString += " and getting peer pressured to drink alcohol. " + heOrShe(person) + " is losing intelligence and money";
			intelligenceRnd = -Math.floor(Math.random() * 2) + 1;
			moneyRnd = -Math.floor(Math.random() * 2) + 1;
		} else {
			happinessRnd = Math.floor(Math.random() * 2);
			outputString += ".";
		}
	} else if (person.age < 18) {
		outputString = "The teen " + person.name + " is socialising";
		if (Math.floor(Math.random() * 3) == 0) {
			outputString += " and getting peer pressured to drink alcohol. " + heOrShe(person) + " is losing intelligence and money";
			intelligenceRnd = -Math.floor(Math.random() * 2) + 1;
			moneyRnd = -Math.floor(Math.random() * 2) + 1;
		} else {
			outputString += " and having innocent fun."
			happinessRnd = Math.floor(Math.random() * 2);
		}
	} else {
		outputString = "The adult " + person.name + " is socialising. ";
		if (Math.floor(Math.random() * 50) == 0) {
			if (person.gender == "male") {
				outputString += "He even found a girlfriend! This makes him super-happy.";
			} else {
				outputString += "She even found a boyfriend! This makes her super-happy.";
			}
			person.happiness += 500;			
		} else {
			happinessRnd = Math.floor(Math.random() * 6) - 3;
			moneyRnd = -Math.floor(Math.random() * 6);
			intelligenceRnd = -Math.floor(Math.random() * 2);
		}
	}
	appendTextConsole(outputString);
	person.happiness += happinessRnd * daysChanged;
	person.intelligence += intelligenceRnd * daysChanged;
	person.money += moneyRnd * daysChanged;
}