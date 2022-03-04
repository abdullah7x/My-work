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
    return "It's super effective!";
  }
  notEffective() {
    return "It's not very effective...";
  }
  normalEffective() {
    return 'Damaged your opponent';
  }
  pokemon1Wins() {
    return `${this.trainer2Pokemon['name']} fainted, ${this.trainer1Pokemon['name']} wins!`;
  }
  pokemon2Wins() {
    console.log(
      `${this.trainer1Pokemon['name']} fainted, ${this.trainer2Pokemon['name']} wins!`
    );
  }
}

module.exports = { Pokemon, Trainer, Battle };
