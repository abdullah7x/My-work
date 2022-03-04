class Pokemon {
  constructor(name, type = "normal", hitpoints, move, sound, attackDamage) {
    this.name = name;
    this.type = type;
    this.hitpoints = hitpoints;
    this.move = move;
    this.sound = sound;
    this.attackDamage = attackDamage;
  }
  strength() {
    if (this.type === "fire") {
      this.strength = "grass";
    } else if (this.type === "grass") {
      this.strength = "water";
    } else this.strength = "fire";
  }
  weakness() {
    if (this.type === "grass") {
      this.weakness = "fire";
    } else if (this.type === "water") {
      this.weakness = "grass";
    } else this.weakness = "water";
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
    } else return "Your Pokemon storage is full!";
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
    let strength1 = this.trainer1Pokemon["strength"];
    let weakness1 = this.trainer1Pokemon["weakness"];
    let strength2 = this.trainer2Pokemon["strength"];
    let weakness2 = this.trainer2Pokemon["weakness"];

    if (this.trainer1Turn) {
      let turnDamage = this.trainer1Pokemon["attackDamage"];
      if (strength1 === this.trainer2Pokemon["type"]) {
        this.trainer2Pokemon["hitpoints"] -= turnDamage * 1.25;
        this.superEffective();
      } else if (strength2 === this.trainer1Pokemon["type"]) {
        this.trainer2Pokemon["hitpoints"] -= turnDamage * 0.75;
        this.notEffective();
      } else {
        this.trainer2Pokemon["hitpoints"] -= turnDamage;
        this.normalEffective();
      }
      this.trainer1Turn = false;
      this.trainer2Turn = true;
    } else if (this.trainer2Turn) {
      let turnDamage = this.trainer2Pokemon["attackDamage"];
      if (strength2 === this.trainer1Pokemon["type"]) {
        this.trainer1Pokemon["hitpoints"] -= turnDamage * 1.25;
        this.superEffective();
      } else if (strength1 === this.trainer2Pokemon["type"]) {
        this.trainer1Pokemon["hitpoints"] -= turnDamage * 0.75;
        this.notEffective();
      } else {
        this.trainer1Pokemon["hitpoints"] -= turnDamage;
        this.normalEffective();
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
    console.log("Damaged your opponent");
  }
}

const abdullahTrainer = new Trainer("Abdullah");
const vaporeonPokemon = new Pokemon(
  "Vaporeon",
  "water",
  70,
  "Hydro pump",
  "Vap... Vaporeon!",
  19
);
abdullahTrainer.catch(vaporeonPokemon);
const camTrainer = new Trainer("Cam");
const charmanderPokemon = new Pokemon(
  "Charmander",
  "fire",
  44,
  "flamethrower",
  "Cha... Charmander!",
  17
);
camTrainer.catch(charmanderPokemon);
const testBattle = new Battle(
  abdullahTrainer,
  "Vaporeon",
  camTrainer,
  "Charmander"
);
vaporeonPokemon.strength();
vaporeonPokemon.weakness();
charmanderPokemon.strength();
charmanderPokemon.weakness();

module.exports = { Pokemon, Trainer, Battle };
