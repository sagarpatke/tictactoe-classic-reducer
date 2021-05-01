import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import { forfeitAction, markAction, startAction } from '../src/actions';
import TicTacToe, { TicTacToeInitialState } from '../src/reducer';
import { Player, PlayerMark, TicTacToeResult, TicTacToeGameStatus, TicTacToeState, UUID } from "../src/types";

describe('Endings', () => {
  it('should detect draw', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 1),
      markAction(PlayerMark.O, 1, 2),
      markAction(PlayerMark.X, 0, 2),
      markAction(PlayerMark.O, 2, 0),
      markAction(PlayerMark.X, 2, 2),
      markAction(PlayerMark.O, 0, 0),
      markAction(PlayerMark.X, 1, 0),
      markAction(PlayerMark.O, 0, 1),
      markAction(PlayerMark.X, 2, 1)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      ['O', 'O', 'X'],
      ['X', 'X', 'O'],
      ['O', 'X', 'X']
    ]);
    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });
    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Drawn);
    
    expect(newState).to.not.have.ownProperty('winner');
  });

  it('should detect row win', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 1),
      markAction(PlayerMark.O, 1, 2),
      markAction(PlayerMark.X, 0, 0),
      markAction(PlayerMark.O, 2, 2),
      markAction(PlayerMark.X, 0, 2),
      markAction(PlayerMark.O, 2, 0),
      markAction(PlayerMark.X, 0, 1)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [   'X',       'X',    'X'],
      [undefined,    'X',    'O'],
      [   'O',    undefined, 'O']
    ]);

    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });

    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Decisive);
    expect(newState).to.have.ownProperty('winner').that.equals(PlayerMark.X);
  });

  it('should detect column win', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 1),
      markAction(PlayerMark.O, 0, 1),
      markAction(PlayerMark.X, 0, 0),
      markAction(PlayerMark.O, 2, 2),
      markAction(PlayerMark.X, 2, 1),
      markAction(PlayerMark.O, 0, 2),
      markAction(PlayerMark.X, 1, 0),
      markAction(PlayerMark.O, 1, 2)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [   'X',       'O',    'O'],
      [   'X',       'X',    'O'],
      [ undefined,   'X',    'O']
    ]);

    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });

    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.X);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Decisive);
    expect(newState).to.have.ownProperty('winner').that.equals(PlayerMark.O);
  });

  it('should detect diagonal 1 win', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 1),
      markAction(PlayerMark.O, 1, 0),
      markAction(PlayerMark.X, 0, 2),
      markAction(PlayerMark.O, 2, 0),
      markAction(PlayerMark.X, 0, 0),
      markAction(PlayerMark.O, 0, 1),
      markAction(PlayerMark.X, 2, 2)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [   'X',       'O',       'X'    ],
      [   'O',       'X',    undefined ],
      [   'O',    undefined,    'X'    ]
    ]);

    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });

    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Decisive);
    expect(newState).to.have.ownProperty('winner').that.equals(PlayerMark.X);
  });

  it('should detect diagonal 2 win', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 2),
      markAction(PlayerMark.O, 1, 1),
      markAction(PlayerMark.X, 2, 2),
      markAction(PlayerMark.O, 0, 2),
      markAction(PlayerMark.X, 0, 0),
      markAction(PlayerMark.O, 2, 0)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [    'X',    undefined,       'O' ],
      [ undefined,    'O',          'X' ],
      [    'O',    undefined,       'X' ]
    ]);

    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });

    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.X);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Decisive);
    expect(newState).to.have.ownProperty('winner').that.equals(PlayerMark.O);
  });

  it('forfeit should end in opponents win', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const actions = [
      startAction(player1, player2),
      markAction(PlayerMark.X, 1, 2),
      markAction(PlayerMark.O, 1, 1),
      markAction(PlayerMark.X, 2, 2),
      markAction(PlayerMark.O, 0, 2),
      markAction(PlayerMark.X, 0, 0),
      forfeitAction(PlayerMark.X)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [    'X',    undefined,       'O' ],
      [ undefined,    'O',          'X' ],
      [ undefined,    undefined,       'X' ]
    ]);

    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });

    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Ended);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    expect(newState).to.have.ownProperty('result').that.equals(TicTacToeResult.Forfeited);
    expect(newState).to.have.ownProperty('winner').that.equals(PlayerMark.O);
  });
});
