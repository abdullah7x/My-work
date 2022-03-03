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
  console.log(trainer1.pokemon[trainer1PokemonName]);
  this.trainer2 = trainer2;
  this.trainer2Pokemon = trainer2Pokemon;
}

module.exports = { Pokemon, Trainer, Battle };
