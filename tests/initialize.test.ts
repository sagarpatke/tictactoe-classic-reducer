import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import TicTacToe, { TicTacToeInitialState } from '../src/reducer';
import { TicTacToeState, PlayerMark, TicTacToeGameStatus, Player, UUID } from '../src/types';
import { markAction, startAction } from '../src/actions';

describe('Initialize Game', () => {
  it('should initialize with proper defaults', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    expect(initialState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ]);
    expect(initialState).to.have.property('turn').that.equals(PlayerMark.X);
    expect(initialState).to.have.property('status').that.equals(TicTacToeGameStatus.NotStarted);

    expect(initialState).to.not.have.ownProperty('winner');
    expect(initialState).to.not.have.ownProperty('result');
    expect(initialState).to.not.have.ownProperty('players');
  });

  it('should start game with correct players and state', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;
    const player1: Player = {
      name: 'player1',
      id:   uuidv4() as UUID
    };

    const player2: Player = {
      name: 'player2',
      id: uuidv4() as UUID
    }

    const action = startAction(player1, player2);

    const newState = TicTacToe(initialState, action);
    expect(initialState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
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

  it('should not mark before start game', () => {
    const initialState: TicTacToeState = TicTacToeInitialState;

    const action = markAction(PlayerMark.X, 1, 1)

    const newState = TicTacToe(initialState, action);
    expect(newState).to.have.property('board').that.eql([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ]);
    expect(newState).to.have.ownProperty('status').that.equals(TicTacToeGameStatus.NotStarted);
    expect(newState).to.have.ownProperty('turn').that.equals(PlayerMark.X);
    
    expect(newState).to.not.have.ownProperty('players');
    expect(newState).to.not.have.ownProperty('winner');
    expect(newState).to.not.have.ownProperty('result');
  });
});
