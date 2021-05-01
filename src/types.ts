export interface TicTacToeState {
  readonly board:    Board,
  readonly turn:     PlayerMark,
  readonly winner?:  PlayerMark,
  readonly status:   TicTacToeGameStatus,
  readonly result?:  TicTacToeResult,
  readonly players?: Players
}

export type Board = readonly [Row, Row, Row]
export type Row = readonly [PlayerMark?, PlayerMark?, PlayerMark?]
export enum PlayerMark {
  X = 'X',
  O = 'O'
}

export interface Players {
  readonly X: Player,
  readonly O: Player
}

export type UUID = string;

export interface Player {
  name: string,
  id:   UUID
}

export type Index = 0 | 1 | 2;

export enum TicTacToeGameStatus {
  Started    = 'Started',
  Ended      = 'Ended',
  NotStarted = 'NotStarted'
}

export enum TicTacToeResult {
  Decisive  = 'Decisive',
  Drawn     = 'Drawn',
  Forfeited = 'Forfeited',
}

export enum TicTacToeActionTypes {
  Mark       = '@@type/Mark',
  Forfeit    = '@@type/Forfeit',
  Start      = '@@type/Start'
}

export interface TicTacToeAction {
  type: TicTacToeActionTypes,
  payload: any
}
