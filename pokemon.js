function Pokemon(name, type = 'normal', hitpoints, move, sound, attackDamage) {
  this.name = name;
  this.type = type;
  this.hitpoints = hitpoints;
  this.move = move;
  this.sound = sound;
  this.attackDamage = attackDamage;
}
Pokemon.prototype.strength = function () {
  if (this.type === 'fire') {
    this.strength = 'grass';
  } else if (this.type === 'grass') {
    this.strength = 'water';
  } else this.strength = 'fire';
};
Pokemon.prototype.weakness = function () {
  if (this.type === 'grass') {
    this.weakness = 'fire';
  } else if (this.type === 'water') {
    this.weakness = 'grass';
  } else this.weakness = 'water';
};
Pokemon.prototype.talk = function () {
  return this.sound;
};
Pokemon.prototype.useYourMoves = function () {
  return this.move;
};
function Trainer(name) {
  this.name = name;
  this.pokemon = [];
}
Trainer.prototype.catch = function (pokemon) {
  if (this.pokemon.length < 6) this.pokemon.push(pokemon);
  else return 'Your Pokemon storage is full!';
};
module.exports = { Pokemon, Trainer };
