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

//btns selector
const startBtn = document.getElementById("start");
const attackBtn = document.getElementById("attack");
const retreatBtn = document.getElementById("retreat");

//function to log the results in the div

function logResults(result) {
  const resultDiv = document.querySelector(".message");

  //create an element to log the result
  const messageElement = document.createElement("p");
  messageElement.classList.add("log-message");
  messageElement.textContent = result;

  resultDiv.appendChild(messageElement);

  resultDiv.scrollTop = resultDiv.scrollHeight;
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
        logResults(`${alienship.name} has taken ${this.firepower} damage!`);
        if (alienship.hull <= 0) {
          //check if Alienship is dead
          logResults(`${alienship.name} has been destroyed!!`);
          break;
        }
      } else logResults(`${this.name} missed!!`);
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
  constructor(name, backgroundImage) {
    super(name);
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = Math.round((Math.random() * (0.8 - 0.6) + 0.6) * 10) / 10;
    this.backgroundImage = backgroundImage;
  }
}
class Game {
  constructor() {
    this.playerShip = new Uss("Aliens worst Nightmare");
    this.aliens = [
      new Aliens(
        "Warlord",
        "url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/bb6d78bb-1cd9-427b-8373-00e8f9191743/c5c4f225-4b8a-4a1e-92a5-3b8babe476d0.png')"
      ),
      new Aliens(
        "Kaido Army",
        "url('https://img.freepik.com/premium-photo/close-up-black-white-alien-head-black-background_958108-99401.jpg')"
      ),
      new Aliens(
        "Doflamingo",
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTx4I1WtjrDLzCqdcQ2WIJGB-p00GDOz2pw&s')"
      ),
      new Aliens(
        "Blackbeard",
        "url('https://img.freepik.com/premium-photo/alien-black-background_238683-1607.jpg')"
      ),
      new Aliens(
        "Madara",
        "url('https://img.freepik.com/premium-photo/mysterious-alien-being-with-large-eyes-holds-glowing-orb-its-hands_1022970-56222.jpg?w=360')"
      ),
    ];
    this.defeatedAliens = 0;
    this.currentAlien = null;
  }

  //start game

  startGame() {
    logResults("Game Started");
    this.selectRandomAlien();
  }

  //function to select random aliens
  selectRandomAlien() {
    if (this.aliens.length === 0) {
      logResults(
        `Congratulation captain ${captain}. You have defeated all alien ships`
      );
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.aliens.length);
    this.currentAlien = this.aliens[randomIndex];
    this.updateBackground(this.currentAlien.backgroundImage);
    this.battle();
  }

  //update background function
  updateBackground(backgroundImage) {
    const alienDiv = document.querySelector(".alienShip");
    alienDiv.style.backgroundImage = backgroundImage;

    alienDiv.style.backgroundSize = "cover";
    alienDiv.style.backgroundPosition = "center";
  }

  //battle function
  battle() {
    //initiate the attack between player ship and alien ship
    this.playerShip.attack(this.currentAlien);

    if (this.currentAlien.hull <= 0) {
      //alien ship is destroyed
      this.aliens = this.aliens.filter((alien) => alien !== this.currentAlien);
      this.defeatedAliens++;

      this.showActionBtns();
    } else if (this.playerShip.hull <= 0) {
      logResults("Game over! You have been destroyed!");
      this.gameOver();
    }
  }
  showActionBtns() {
    attackBtn.style.display = "inline-block";
    retreatBtn.style.display = "inline-block";

    attackBtn.onclick = () => {
      attackBtn.style.display = "none";
      retreatBtn.style.display = "none";
      this.selectRandomAlien();
    };

    retreatBtn.onclick = () => {
      attackBtn.style.display = "none";
      retreatBtn.style.display = "none";
      this.retreat();
    };
  }

  retreat() {
    logResults(
      `You retreated. You defeated ${this.defeatedAliens} alien(s). The game is over.`
    );
  }

  gameOver() {
    attackBtn.style.display = "none";
    retreatBtn.style.display = "none";

    logResults(
      `Game over, your ship is destroyed. You defeated ${this.defeatedAliens}`
    );
  }
}

//function to get captains name

function whenLoaded() {
  captain = prompt(
    "Welcome captain, please enter your name to continue to the game."
  );
}
window.onload = function () {
  whenLoaded();
};
const game = new Game();

document.querySelector("#start").addEventListener("click", function () {
  game.startGame();
});
