const inquirer = require('inquirer');
class Pokemon {
  constructor(name, type = 'normal', hitpoints, move, sound, attackDamage) {
    this.name = name;
    this.type = type;
    this.hitpoints = hitpoints;
    this.move = move;
    this.sound = sound;
    this.attackDamage = attackDamage;
  }
  strength() {
    if (this.type === 'fire') {
      this.strength = 'grass';
    } else if (this.type === 'grass') {
      this.strength = 'water';
    } else this.strength = 'fire';
  }
  weakness() {
    if (this.type === 'grass') {
      this.weakness = 'fire';
    } else if (this.type === 'water') {
      this.weakness = 'grass';
    } else this.weakness = 'water';
  }
  talk() {
    return this.sound;
  }
  useYourMoves() {
    return this.move;
  }
}
class Trainer {
  constructor(name) {
    this.name = name;
    this.pokemon = {};
    this.numberOfPokemon = 0;
  }

  catch(pokemon) {
    if (this.numberOfPokemon < 6) {
      this.pokemon[pokemon.name] = pokemon;
      this.numberOfPokemon++;
    } else return 'Your Pokemon storage is full!';
  }
}
class Battle {
  constructor(trainer1, trainer1PokemonName, trainer2, trainer2PokemonName) {
    this.trainer1 = trainer1.name;
    this.trainer1Pokemon = trainer1.pokemon[trainer1PokemonName];
    this.trainer2 = trainer2.name;
    this.trainer2Pokemon = trainer2.pokemon[trainer2PokemonName];
    this.trainer1Turn = true;
    this.trainer2Turn = false;
  }
  fight() {
    let strength1 = this.trainer1Pokemon['strength'];
    let weakness1 = this.trainer1Pokemon['weakness'];
    let strength2 = this.trainer2Pokemon['strength'];
    let weakness2 = this.trainer2Pokemon['weakness'];

    if (this.trainer1Turn && this.trainer1Pokemon['hitpoints'] > 0) {
      let turnDamage = this.trainer1Pokemon['attackDamage'];
      if (strength1 === this.trainer2Pokemon['type']) {
        this.trainer2Pokemon['hitpoints'] -= turnDamage * 1.25;
        this.superEffective();
      } else if (strength2 === this.trainer1Pokemon['type']) {
        this.trainer2Pokemon['hitpoints'] -= turnDamage * 0.75;
        this.notEffective();
      } else {
        this.trainer2Pokemon['hitpoints'] -= turnDamage;
        this.normalEffective();
      }
      this.trainer1Turn = false;
      this.trainer2Turn = true;
      if (this.trainer2Pokemon['hitpoints'] <= 0) {
        this.pokemon1Wins();
      }
    } else if (this.trainer2Turn && this.trainer2Pokemon['hitpoints'] > 0) {
      let turnDamage = this.trainer2Pokemon['attackDamage'];
      if (strength2 === this.trainer1Pokemon['type']) {
        this.trainer1Pokemon['hitpoints'] -= turnDamage * 1.25;
        this.superEffective();
      } else if (strength1 === this.trainer2Pokemon['type']) {
        this.trainer1Pokemon['hitpoints'] -= turnDamage * 0.75;
        this.notEffective();
      } else {
        this.trainer1Pokemon['hitpoints'] -= turnDamage;
        this.normalEffective();
      }
      if (this.trainer1Pokemon['hitpoints'] <= 0) {
        this.pokemon2Wins();
      }
      this.trainer1Turn = true;
      this.trainer2Turn = false;
    }
  }

  superEffective() {
    console.log("It's super effective!");
  }
  notEffective() {
    console.log("It's not very effective...");
  }
  normalEffective() {
    console.log('Damaged your opponent');
  }
  pokemon1Wins() {
    console.log(
      `${this.trainer2Pokemon['name']} fainted, ${this.trainer1Pokemon['name']} wins!`
    );
  }
  pokemon2Wins() {
    console.log(
      `${this.trainer1Pokemon['name']} fainted, ${this.trainer2Pokemon['name']} wins!`
    );
  }
}
const firstQuestions = [
  {
    type: 'input',
    name: 'name1',
    message: 'Trainer 1, what is your name?',
    default: 'Ash',
  },
  {
    type: 'list',
    name: 'pokemon1',
    message: 'Trainer 1, which pokemon do you choose?',
    choices: ['Eevee', 'Charmander', 'Vaporeon'],
  },
  {
    type: 'input',
    name: 'name2',
    message: 'Trainer 2, what is your name?',
    default: 'Ash',
  },
  {
    type: 'list',
    name: 'pokemon2',
    message: 'Trainer 2, which pokemon do you choose?',
    choices: ['Eevee', 'Charmander', 'Vaporeon'],
  },
  {
    type: 'input',
    name: 'talkToPokemon',
    message: 'Say something to your new Pokemon!',
    default: 'Hello',
  },
];
const secondQuestions = [
  {
    type: 'list',
    name: 'battle',
    message: 'Would you both like to battle?',
    choices: ['Yes', 'No'],
  },
];
const thirdQuestions = [
  {
    type: 'list',
    name: 'turnOne',
    message: 'Trainer 1, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
const fourthQuestion = [
  {
    type: 'list',
    name: 'turnTwo',
    message: 'Trainer 2, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
const fifthQuestions = [
  {
    type: 'list',
    name: 'turnThree',
    message: 'Trainer 1, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
const sixthQuestion = [
  {
    type: 'list',
    name: 'turnFour',
    message: 'Trainer 2, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
const seventhQuestion = [
  {
    type: 'list',
    name: 'turnFive',
    message: 'Trainer 1, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
const eighthQuestion = [
  {
    type: 'list',
    name: 'turnSix',
    message: 'Trainer 2, what would you like  to do?',
    choices: ['Fight!', 'Flee'],
  },
];
let firstTrainer;
let secondTrainer;
let pokemonOne;
let pokemonTwo;
let realBattle;
function playGame() {
  inquirer
    .prompt(firstQuestions)
    .then(function (firstAnswers) {
      firstTrainer = new Trainer(firstAnswers.name1);
      pokemonOne = firstAnswers.pokemon1;
      if (firstAnswers.pokemon1 === 'Eevee') {
        const Eevee = new Pokemon(
          'Eevee',
          'normal',
          55,
          'Headbutt',
          'Eev... Eevee!',
          18
        );
        firstTrainer.catch(Eevee);
      }
      if (firstAnswers.pokemon1 === 'Charmander') {
        const Charmander = new Pokemon(
          'Charmander',
          'fire',
          44,
          'flamethrower',
          'Cha... Charmander!',
          17
        );
        firstTrainer.catch(Charmander);
      }
      if (firstAnswers.pokemon1 === 'Vaporeon') {
        const Vaporeon = new Pokemon(
          'Vaporeon',
          'water',
          70,
          'Hydro pump',
          'Vap... Vaporeon!',
          19
        );
        firstTrainer.catch(Vaporeon);
      }
      secondTrainer = new Trainer(firstAnswers.name2);
      pokemonTwo = firstAnswers.pokemon2;
      if (firstAnswers.pokemon2 === 'Eevee') {
        const Eevee = new Pokemon(
          'Eevee',
          'normal',
          55,
          'Headbutt',
          'Eev... Eevee!',
          18
        );
        secondTrainer.catch(Eevee);
      }
      if (firstAnswers.pokemon2 === 'Charmander') {
        const Charmander = new Pokemon(
          'Charmander',
          'fire',
          44,
          'flamethrower',
          'Cha... Charmander!',
          17
        );
        secondTrainer.catch(Charmander);
      }
      if (firstAnswers.pokemon2 === 'Vaporeon') {
        const Vaporeon = new Pokemon(
          'Vaporeon',
          'water',
          70,
          'Hydro pump',
          'Vap... Vaporeon!',
          19
        );
        secondTrainer.catch(Vaporeon);
      }
      if (firstAnswers.talkToPokemon) {
        console.log(firstTrainer.pokemon[pokemonOne].sound);
        console.log(secondTrainer.pokemon[pokemonTwo].sound);
      }
      return inquirer.prompt(secondQuestions);
    })
    .then(function (secondAnswers) {
      if (secondAnswers.battle === 'Yes') {
        realBattle = new Battle(
          firstTrainer,
          pokemonOne,
          secondTrainer,
          pokemonTwo
        );
        console.log("Let's battle!");
      } else console.log('Muppets!');
      return inquirer.prompt(thirdQuestions);
    })
    .then(function (thirdQuestions) {
      if (thirdQuestions.turnOne === 'Fight!') {
        realBattle.fight();
        console.log(
          `${realBattle.trainer2Pokemon.name}'s hitpoints are now ${realBattle.trainer2Pokemon.hitpoints}!`
        );
      } else console.log(`${realBattle.trainer2} wins`);
    });
}
playGame();
