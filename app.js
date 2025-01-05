//create a ship class that has name that has the hull, fire power and accuracy properties
// name

//create a uss ship and alien ship extending the ship class
// - uss ship
//  hull - 20
// firepower - 5
// accuracy - .7
//

// create a action class, create functions inside actions class
//The battle function will take two class ship class as parameter performs accordingly
// the retreat function will end the game

//function to log the results in the div

function logResults(result) {
  const resultDiv = document.querySelector(".message");

  //create an element to log the result
  const messageElement = document.createElement("p");
  messageElement.classList.add("log-message");
  messageElement.textContent = result;

  resultDiv.appendChild(messageElement);
}

let captain;
let shipName;
class Ship {
  constructor(name) {
    this.name = name;
  }
}
class Uss extends Ship {
  constructor(name) {
    super(name);
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.attack = this.attack.bind(this);
  }

  attack(alienship) {
    //attack while both ships are alive
    logResults(`You are fighting ${alienship.name}!!`);

    while (alienship.hull > 0 && this.hull > 0) {
      if (Math.random() < this.accuracy) {
        alienship.hull -= this.firepower;
        addToConsol(`${alienship.name} has taken ${this.firepower} damage!`);
        if (alienship.hull <= 0) {
          //check if Alienship is dead
          logResults(`${alienship.name} has been destroyed!!`);

          break;
        }
      } else addToConsol(`${this.name} missed!!`);
      if (Math.random() < alienship.accuracy) {
        this.hull -= alienship.firepower;
        logResults(`${this.name} has taken ${alienship.firepower} damage!`);
        if (this.hull <= 0) {
          logResults(`${this.name} has been destroyed!!`);
          break;
        }
      } else logResults(`${alienship.name} missed!!`);
    }
  }
}

class Aliens extends Ship {
  constructor(name) {
    super(name);
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = Math.round((Math.random() * (0.8 - 0.6) + 0.6) * 10) / 10;
  }
}

let ship = new Uss("suman");
// console.log(ship);
let alien = new Aliens("Domgadon");
// console.log(alien);
ship.attack(alien);
