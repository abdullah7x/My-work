const { Pokemon, Trainer, Battle } = require('../pokemon-game.js');
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
    expect(testTrainer.pokemon).toEqual({
      Eevee: {
        name: 'Eevee',
        type: 'normal',
        hitpoints: 55,
        move: 'Headbutt',
        sound: 'Eev... Eevee!',
        attackDamage: 18,
      },
    });
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
    expect(testTrainer.numberOfPokemon).toBe(6);
  });
});

describe('Battle', () => {
  test('returns an object', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const eeveePokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    abdullahTrainer.catch(eeveePokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const newBattle = new Battle(
      abdullahTrainer,
      'Eevee',
      camTrainer,
      'Charmander'
    );
    expect(typeof newBattle).toBe('object');
  });
  test('Battle instance has correct properties', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const eeveePokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    abdullahTrainer.catch(eeveePokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Eevee',
      camTrainer,
      'Charmander'
    );
    expect(testBattle).toHaveProperty('trainer1');
    expect(testBattle).toHaveProperty('trainer2');
    expect(testBattle).toHaveProperty('trainer2Pokemon');
    expect(testBattle).toHaveProperty('trainer1Pokemon');
  });
  test('Trainer instance can be added to a new Battle instance', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const eeveePokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    abdullahTrainer.catch(eeveePokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Eevee',
      camTrainer,
      'Charmander'
    );
    expect(testBattle.trainer1).toEqual('Abdullah');
  });
  test('Trainer including pokemon instance can be added to a new Battle instance', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const eeveePokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    abdullahTrainer.catch(eeveePokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Eevee',
      camTrainer,
      'Charmander'
    );
    expect(testBattle.trainer1).toEqual('Abdullah');
    expect(testBattle.trainer1Pokemon).toEqual({
      name: 'Eevee',
      type: 'normal',
      hitpoints: 55,
      move: 'Headbutt',
      sound: 'Eev... Eevee!',
      attackDamage: 18,
    });
  });
  test('Trainer including pokemon instance can be added to a new Battle instance', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const eeveePokemon = new Pokemon(
      'Eevee',
      'normal',
      55,
      'Headbutt',
      'Eev... Eevee!',
      18
    );
    abdullahTrainer.catch(eeveePokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Eevee',
      camTrainer,
      'Charmander'
    );
    testBattle.fight();
    testBattle.fight();
    expect(camTrainer.pokemon['Charmander']['hitpoints']).toBe(26);
    expect(abdullahTrainer.pokemon['Eevee']['hitpoints']).toBe(38);
    testBattle.fight();
    testBattle.fight();
    expect(camTrainer.pokemon['Charmander']['hitpoints']).toBe(8);
    expect(abdullahTrainer.pokemon['Eevee']['hitpoints']).toBe(21);
  });
  test('check if fight method accounts for strengths and weaknesses', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const vaporeonPokemon = new Pokemon(
      'Vaporeon',
      'water',
      70,
      'Hydro pump',
      'Vap... Vaporeon!',
      19
    );
    abdullahTrainer.catch(vaporeonPokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Vaporeon',
      camTrainer,
      'Charmander'
    );
    vaporeonPokemon.strength();
    vaporeonPokemon.weakness();
    charmanderPokemon.strength();
    charmanderPokemon.weakness();
    testBattle.fight();

    expect(camTrainer.pokemon['Charmander']['hitpoints']).toBe(20.25);

    testBattle.fight();

    expect(abdullahTrainer.pokemon['Vaporeon']['hitpoints']).toBe(57.25);
  });
  test('check if messaage apeears after pokemon wins and losing cannot attack', () => {
    const abdullahTrainer = new Trainer('Abdullah');
    const vaporeonPokemon = new Pokemon(
      'Vaporeon',
      'water',
      70,
      'Hydro pump',
      'Vap... Vaporeon!',
      19
    );
    abdullahTrainer.catch(vaporeonPokemon);
    const camTrainer = new Trainer('Cam');
    const charmanderPokemon = new Pokemon(
      'Charmander',
      'fire',
      44,
      'flamethrower',
      'Cha... Charmander!',
      17
    );
    camTrainer.catch(charmanderPokemon);
    const testBattle = new Battle(
      abdullahTrainer,
      'Vaporeon',
      camTrainer,
      'Charmander'
    );
    vaporeonPokemon.strength();
    vaporeonPokemon.weakness();
    charmanderPokemon.strength();
    charmanderPokemon.weakness();
    testBattle.fight();
    testBattle.fight();
    testBattle.fight();
    testBattle.fight();
    expect(abdullahTrainer.pokemon['Vaporeon']['hitpoints']).toBe(57.25);
  });
});
