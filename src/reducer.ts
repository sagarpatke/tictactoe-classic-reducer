import { PlayerMark, TicTacToeResult, Row, TicTacToeAction, TicTacToeActionTypes, TicTacToeGameStatus, TicTacToeState, Board } from "./types";

type TicTacToeReducer = (currentState: TicTacToeState, action: TicTacToeAction) => TicTacToeState;

export const TicTacToeInitialState: TicTacToeState = {
  board: [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ],
  turn: PlayerMark.X,
  status: TicTacToeGameStatus.NotStarted
} as const;

function checkWin(board: Board): [PlayerMark, Array<[number, number]>] | undefined {
  const winningCombinations: Array<Array<[number, number]>> = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];

  for(let combination of winningCombinations) {
    const p1 = combination[0];
    const p2 = combination[1];
    const p3 = combination[2];

    const valueAtP1 = board[p1[0]][p1[1]] as PlayerMark;
    const valueAtP2 = board[p2[0]][p2[1]] as PlayerMark;
    const valueAtP3 = board[p3[0]][p3[1]] as PlayerMark;

    if(valueAtP1 && valueAtP1 === valueAtP2 && valueAtP2 === valueAtP3) {
      return [valueAtP1, combination];
    }
  }
}

const TicTacToe: TicTacToeReducer = (currentState: TicTacToeState = TicTacToeInitialState, {type, payload}: TicTacToeAction) => {
  switch(type) {
    case TicTacToeActionTypes.Start:
      return {
        ...currentState,
        players: {
          X: payload.X,
          O: payload.O
        },
        status: TicTacToeGameStatus.Started
      } as const;
    case TicTacToeActionTypes.Mark:
      const {playerMark, rowIndex, colIndex} = payload;

      if(
        currentState.status !== TicTacToeGameStatus.Started
        || playerMark !== currentState.turn
        || currentState.board[rowIndex][colIndex]
      ) return currentState;

      const newBoard = [
        ...currentState.board.slice(0,rowIndex),
        [ ...currentState.board[rowIndex].slice(0, colIndex), playerMark, ...currentState.board[rowIndex].slice(colIndex+1) ],
        ...currentState.board.slice(rowIndex+1)
      ] as [Row, Row, Row];

      const newTurn = playerMark === PlayerMark.X ? PlayerMark.O : PlayerMark.X;

      const newState = {
        ...currentState,
        board: newBoard,
        turn: newTurn
      };

      const drawReducer = (c?: PlayerMark, i?: PlayerMark) => c && i;
      const isDrawn = newBoard.map(row => row.reduce(drawReducer)).reduce(drawReducer);

      const isWon = checkWin(newBoard);

      if(isWon) {
        newState.result = TicTacToeResult.Decisive;
        newState.status = TicTacToeGameStatus.Ended;
        newState.winner = isWon[0];
      } else
      if(isDrawn) {
        newState.result = TicTacToeResult.Drawn;
        newState.status = TicTacToeGameStatus.Ended;
      }

      return {...newState} as const;
    case TicTacToeActionTypes.Forfeit:
      return {
        ...currentState,
        winner: payload.playerMark === PlayerMark.X ? PlayerMark.O : PlayerMark.X,
        status: TicTacToeGameStatus.Ended,
        result: TicTacToeResult.Forfeited
      }
    default:
      return currentState;
  };
}

export default TicTacToe;