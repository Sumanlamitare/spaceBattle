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

  attack(alienShip) {
    console.log(`${this.name} is attacking ${alienShip.name}`);
    while (alienShip.hull > 0 && this.hull > 0)
      if (Math.random() < this.accuracy) {
        alienShip.hull -= this.firepower;

        console.log(`Alienship got hit and lost ${this.fireopower}`);
      }

    if (Math.random() < alienShip.accuracy) {
      this.hull -= alienShip.firepower;
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
