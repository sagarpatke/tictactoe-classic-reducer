import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import { markAction, startAction } from '../src/actions';
import TicTacToe, { TicTacToeInitialState } from '../src/reducer';
import { Player, PlayerMark, TicTacToeGameStatus, TicTacToeState, UUID } from "../src/types";

describe('Second Turn', () => {
  it('O is playable', () => {
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
      markAction(PlayerMark.O, 1, 2)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, 'X', 'O'],
      [undefined, undefined, undefined]
    ]);
    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });
    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Started);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.X);
    
    expect(newState).to.not.have.ownProperty('winner');
    expect(newState).to.not.have.ownProperty('result');
  });

  it('X is not playable', () => {
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
      markAction(PlayerMark.X, 1, 2)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, 'X', undefined],
      [undefined, undefined, undefined]
    ]);
    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });
    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Started);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    
    expect(newState).to.not.have.ownProperty('winner');
    expect(newState).to.not.have.ownProperty('result');
  });

  it('O cannot overwrite X in second turn', () => {
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
      markAction(PlayerMark.O, 1, 1)
    ];

    const newState = actions.reduce(TicTacToe, initialState);

    expect(newState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, 'X', undefined],
      [undefined, undefined, undefined]
    ]);
    expect(newState).to.have.ownProperty('players').that.eql({
      X: player1,
      O: player2
    });
    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.Started);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.O);
    
    expect(newState).to.not.have.ownProperty('winner');
    expect(newState).to.not.have.ownProperty('result');
  });
});