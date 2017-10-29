class Person {
	constructor(name, gender) {
		//TODO lag startverdier random;
		this.name = name;
		this.money = 0;
		this.intelligence = 0;
		this.happiness = 0;
		this.gender = gender;
		this.birthday;
		this.div;
		this.age = 0;
	}
}

function calculateAge(person) {
	const prevAge = person.age;

	const birthdayDate =  new Date(parseInt(person.birthday, 10));
	const diff = date.getTime() - birthdayDate.getTime();

	const newAge = Math.floor(diff / (365*1000*60*60*24));
	if (newAge !== prevAge) {
		appendTextConsole(person.name + " just turned " +newAge + " congratulations!");
	}
	person.age = newAge;
}
