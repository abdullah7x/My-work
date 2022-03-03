const { Pokemon, Trainer } = require('../pokemon.js');
describe('Pokemon', () => {
  test('returns an object', () => {
    const testPokemon = new Pokemon('dog', 'dog', 'dog', 'dog');
    expect(typeof testPokemon).toBe('object');
  });
  test('default of type property is normal', () => {
    const testPokemon = new Pokemon();
    expect(testPokemon.type).toBe('normal');
  });
  test('type property can be set to "fire"', () => {
    const testPokemon = new Pokemon('dog', 'fire');
    expect(testPokemon.type).toBe('fire');
  });
  test('returns new Pokemon when given all arguments', () => {
    const testPokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    expect(testPokemon).toEqual({
      name: 'Eevee',
      type: 'normal',
      hitpoints: 55,
      move: 'Headbutt',
      sound: 'Eev... Eevee!',
      attackDamage: 18,
    });
  });
  test('Strength prototype returns correct strength', () => {
    const testPokemon = new Pokemon('dog', 'fire');
    testPokemon.strength();
    expect(testPokemon.strength).toBe('grass');
  });
  test('weakness prototype returns correct weakness', () => {
    const testPokemon = new Pokemon('dog', 'fire');
    testPokemon.weakness();
    expect(testPokemon.weakness).toBe('water');
  });
  test('talk method returns sound', () => {
    const testPokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    expect(testPokemon.talk()).toEqual('Eev... Eevee!');
  });
  test('useYourMoves method returns move', () => {
    const testPokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    expect(testPokemon.useYourMoves()).toEqual('Headbutt');
  });
});
describe('Trainer', () => {
  test('catch method pushes pokemon into trainer', () => {
    const testPokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    const testTrainer = new Trainer('Abdullah');
    testTrainer.catch(testPokemon);
    expect(testTrainer.pokemon).toEqual([
      {
        name: 'Eevee',
        type: 'normal',
        hitpoints: 55,
        move: 'Headbutt',
        sound: 'Eev... Eevee!',
        attackDamage: 18,
      },
    ]);
  });
  test('catch method only pushes when storage not full', () => {
    const testPokemon = new Pokemon();
    const testPokemon2 = new Pokemon();
    const testPokemon3 = new Pokemon();
    const testPokemon4 = new Pokemon();
    const testPokemon5 = new Pokemon();
    const testPokemon6 = new Pokemon();
    const testPokemon7 = new Pokemon();
    const testTrainer = new Trainer('Abdullah');
    testTrainer.catch(testPokemon);
    testTrainer.catch(testPokemon7);
    testTrainer.catch(testPokemon2);
    testTrainer.catch(testPokemon3);
    testTrainer.catch(testPokemon4);
    testTrainer.catch(testPokemon5);
    testTrainer.catch(testPokemon6);
    expect(testTrainer.pokemon.length).toBe(6);
  });
});
