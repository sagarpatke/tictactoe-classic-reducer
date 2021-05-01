import { PlayerMark } from './types';
import { Index, Player, TicTacToeActionTypes } from './types';
export const markAction    = (playerMark: PlayerMark, rowIndex: Index, colIndex: Index) => ({type: TicTacToeActionTypes.Mark      , payload: { playerMark, rowIndex, colIndex }});
export const forfeitAction = (playerMark: PlayerMark)                                   => ({type: TicTacToeActionTypes.Forfeit   , payload: { playerMark }});
export const startAction   = (X: Player, O: Player)                                 => ({type: TicTacToeActionTypes.Start     , payload: { X, O }});