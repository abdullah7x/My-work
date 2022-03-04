function Pokemon(name, type = "normal", hitpoints, move, sound, attackDamage) {
  this.name = name;
  this.type = type;
  this.hitpoints = hitpoints;
  this.move = move;
  this.sound = sound;
  this.attackDamage = attackDamage;
}
Pokemon.prototype.strength = function () {
  if (this.type === "fire") {
    this.strength = "grass";
  } else if (this.type === "grass") {
    this.strength = "water";
  } else this.strength = "fire";
};
Pokemon.prototype.weakness = function () {
  if (this.type === "grass") {
    this.weakness = "fire";
  } else if (this.type === "water") {
    this.weakness = "grass";
  } else this.weakness = "water";
};
Pokemon.prototype.talk = function () {
  return this.sound;
};
Pokemon.prototype.useYourMoves = function () {
  return this.move;
};
function Trainer(name) {
  this.name = name;
  this.pokemon = {};
  this.numberOfPokemon = 0;
}
Trainer.prototype.catch = function (pokemon) {
  if (this.numberOfPokemon < 6) {
    this.pokemon[pokemon.name] = pokemon;
    this.numberOfPokemon++;
  } else return "Your Pokemon storage is full!";
};

function Battle(trainer1, trainer1PokemonName, trainer2, trainer2PokemonName) {
  this.trainer1 = trainer1.name;
  this.trainer1Pokemon = trainer1.pokemon[trainer1PokemonName];
  this.trainer2 = trainer2.name;
  this.trainer2Pokemon = trainer2.pokemon[trainer2PokemonName];
  this.trainer1Turn = true;
  this.trainer2Turn = false;
}
Battle.prototype.fight = function fightNow() {
  let strength1 = this.trainer1Pokemon["strength"];
  let weakness1 = this.trainer1Pokemon["weakness"];
  let strength2 = this.trainer2Pokemon["strength"];
  let weakness2 = this.trainer2Pokemon["weakness"];
  if (this.trainer1Turn) {
    let turnDamage = this.trainer1Pokemon["attackDamage"];
    if (strength1 === this.trainer2Pokemon["type"]) {
      this.trainer2Pokemon["hitpoints"] -= turnDamage * 1.25;
    } else if (strength2 === this.trainer1Pokemon["type"]) {
      this.trainer2Pokemon["hitpoints"] -= turnDamage * 0.75;
      return;
    } else {
      this.trainer2Pokemon["hitpoints"] -= turnDamage;
    }
    this.trainer1Turn = false;
    this.trainer2Turn = true;
  } else if (this.trainer2Turn) {
    let turnDamage = this.trainer2Pokemon["attackDamage"];
    if (strength2 === this.trainer1Pokemon["type"]) {
      this.trainer1Pokemon["hitpoints"] -= turnDamage * 1.25;
    } else if (strength1 === this.trainer2Pokemon["type"]) {
      this.trainer1Pokemon["hitpoints"] -= turnDamage * 0.75;
    } else {
      this.trainer1Pokemon["hitpoints"] -= turnDamage;
    }
    this.trainer1Turn = true;
    this.trainer2Turn = false;
  }
};
module.exports = { Pokemon, Trainer, Battle };
