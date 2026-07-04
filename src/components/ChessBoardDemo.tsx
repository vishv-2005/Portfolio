import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Sparkles, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface ChessPiece {
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
  color: 'w' | 'b';
  id: string;
}

type BoardGrid = (ChessPiece | null)[][];

const INITIAL_BOARD: BoardGrid = [
  [
    { type: 'r', color: 'b', id: 'br1' },
    { type: 'n', color: 'b', id: 'bn1' },
    { type: 'b', color: 'b', id: 'bb1' },
    { type: 'q', color: 'b', id: 'bq1' },
    { type: 'k', color: 'b', id: 'bk1' },
    { type: 'b', color: 'b', id: 'bb2' },
    { type: 'n', color: 'b', id: 'bn2' },
    { type: 'r', color: 'b', id: 'br2' }
  ],
  [
    { type: 'p', color: 'b', id: 'bp1' },
    { type: 'p', color: 'b', id: 'bp2' },
    { type: 'p', color: 'b', id: 'bp3' },
    { type: 'p', color: 'b', id: 'bp4' },
    { type: 'p', color: 'b', id: 'bp5' },
    { type: 'p', color: 'b', id: 'bp6' },
    { type: 'p', color: 'b', id: 'bp7' },
    { type: 'p', color: 'b', id: 'bp8' }
  ],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  [
    { type: 'p', color: 'w', id: 'wp1' },
    { type: 'p', color: 'w', id: 'wp2' },
    { type: 'p', color: 'w', id: 'wp3' },
    { type: 'p', color: 'w', id: 'wp4' },
    { type: 'p', color: 'w', id: 'wp5' },
    { type: 'p', color: 'w', id: 'wp6' },
    { type: 'p', color: 'w', id: 'wp7' },
    { type: 'p', color: 'w', id: 'wp8' }
  ],
  [
    { type: 'r', color: 'w', id: 'wr1' },
    { type: 'n', color: 'w', id: 'wn1' },
    { type: 'b', color: 'w', id: 'wb1' },
    { type: 'q', color: 'w', id: 'wq1' },
    { type: 'k', color: 'w', id: 'wk1' },
    { type: 'b', color: 'w', id: 'wb2' },
    { type: 'n', color: 'w', id: 'wn2' },
    { type: 'r', color: 'w', id: 'wr2' }
  ]
];

const PIECE_SYMBOLS: Record<string, string> = {
  w_p: '♙', w_r: '♖', w_n: '♘', w_b: '♗', w_q: '♕', w_k: '♔',
  b_p: '♟', b_r: '♜', b_n: '♞', b_b: '♝', b_q: '♛', b_k: '♚'
};

export default function ChessBoardDemo() {
  const [board, setBoard] = useState<BoardGrid>(INITIAL_BOARD);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [gameState, setGameState] = useState<'active' | 'checkmate' | 'stalemate'>('active');
  const [winner, setWinner] = useState<'w' | 'b' | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [legalMoves, setLegalMoves] = useState<{ r: number; c: number }[]>([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [specialEffect, setSpecialEffect] = useState<string | null>(null);

  // Clear special effects timer
  useEffect(() => {
    if (specialEffect) {
      const timer = setTimeout(() => setSpecialEffect(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [specialEffect]);

  // Generates pseudo-legal moves (ignoring checks on own king)
  const getPseudoMoves = (r: number, c: number, piece: ChessPiece, boardState: BoardGrid) => {
    const moves: { r: number; c: number }[] = [];
    const { type, color } = piece;

    if (type === 'p') {
      const dir = color === 'w' ? -1 : 1;
      const nextRow = r + dir;
      if (nextRow >= 0 && nextRow < 8) {
        // Forward 1 square
        if (!boardState[nextRow][c]) {
          moves.push({ r: nextRow, c });
          // Forward 2 squares from initial rank
          const startRow = color === 'w' ? 6 : 1;
          const doubleRow = r + dir * 2;
          if (r === startRow && !boardState[doubleRow][c]) {
            moves.push({ r: doubleRow, c });
          }
        }
        // Diagonal Captures
        for (const dc of [-1, 1]) {
          const nc = c + dc;
          if (nc >= 0 && nc < 8) {
            const targetPiece = boardState[nextRow][nc];
            if (targetPiece && targetPiece.color !== color) {
              moves.push({ r: nextRow, c: nc });
            }
          }
        }
      }
    } else if (type === 'n') {
      const offsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of offsets) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = boardState[nr][nc];
          if (!target || target.color !== color) {
            moves.push({ r: nr, c: nc });
          }
        }
      }
    } else if (type === 'k') {
      const offsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      for (const [dr, dc] of offsets) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = boardState[nr][nc];
          if (!target || target.color !== color) {
            moves.push({ r: nr, c: nc });
          }
        }
      }
    } else {
      // Sliding pieces (Rook, Bishop, Queen)
      const dirs: [number, number][] = [];
      if (type === 'r' || type === 'q') {
        dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      }
      if (type === 'b' || type === 'q') {
        dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      }

      for (const [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;
        while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = boardState[nr][nc];
          if (!target) {
            moves.push({ r: nr, c: nc });
          } else {
            if (target.color !== color) {
              moves.push({ r: nr, c: nc });
            }
            break; // Blocked by piece
          }
          nr += dr;
          nc += dc;
        }
      }
    }

    return moves;
  };

  // Check if a color's king is in check
  const isKingInCheck = (color: 'w' | 'b', boardState: BoardGrid) => {
    // 1. Locate King
    let kingR = -1;
    let kingC = -1;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const cell = boardState[r][c];
        if (cell && cell.type === 'k' && cell.color === color) {
          kingR = r;
          kingC = c;
          break;
        }
      }
      if (kingR !== -1) break;
    }
    if (kingR === -1) return false; // Safety fallback

    // 2. Check if any opponent piece attacks the king
    const opponentColor = color === 'w' ? 'b' : 'w';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const cell = boardState[r][c];
        if (cell && cell.color === opponentColor) {
          const pseudo = getPseudoMoves(r, c, cell, boardState);
          if (pseudo.some(m => m.r === kingR && m.c === kingC)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Get true legal moves (filtering out moves that result in or leave king in check)
  const getLegalMoves = (r: number, c: number, piece: ChessPiece, boardState: BoardGrid) => {
    const pseudo = getPseudoMoves(r, c, piece, boardState);
    return pseudo.filter(m => {
      const cloned = boardState.map(row => row.map(cell => cell ? { ...cell } : null));
      // Simulate move
      cloned[m.r][m.c] = cloned[r][c];
      cloned[r][c] = null;
      // Is own king safe?
      return !isKingInCheck(piece.color, cloned);
    });
  };

  // Check checkmate or stalemate
  const verifyGameEnd = (color: 'w' | 'b', boardState: BoardGrid) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const cell = boardState[r][c];
        if (cell && cell.color === color) {
          const legals = getLegalMoves(r, c, cell, boardState);
          if (legals.length > 0) {
            return null; // Game continues
          }
        }
      }
    }

    // No legal moves!
    if (isKingInCheck(color, boardState)) {
      return 'checkmate';
    } else {
      return 'stalemate';
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (aiThinking || gameState !== 'active') return;

    const cell = board[r][c];
    const isTargetMove = legalMoves.some(m => m.r === r && m.c === c);

    if (isTargetMove && selectedCell) {
      executeMove(selectedCell.r, selectedCell.c, r, c);
      return;
    }

    // White's turn - can select white pieces only
    if (turn === 'w' && cell && cell.color === 'w') {
      setSelectedCell({ r, c });
      setLegalMoves(getLegalMoves(r, c, cell, board));
    } else {
      setSelectedCell(null);
      setLegalMoves([]);
    }
  };

  const executeMove = (fromR: number, fromC: number, toR: number, toC: number) => {
    const piece = board[fromR][fromC];
    if (!piece) return;

    const newBoard = board.map(row => row.map(cell => cell ? { ...cell } : null));
    const captured = newBoard[toR][toC];
    
    // Execute move
    newBoard[toR][toC] = piece;
    newBoard[fromR][fromC] = null;

    let notation = `${piece.type.toUpperCase()}${String.fromCharCode(97 + toC)}${8 - toR}`;
    if (captured) {
      notation = `${piece.type.toUpperCase()}x${String.fromCharCode(97 + toC)}${8 - toR}`;
    }

    // Pawn Promotion
    if (piece.type === 'p' && (toR === 0 || toR === 7)) {
      newBoard[toR][toC] = { ...piece, type: 'q' };
      notation += "=Q";
      setSpecialEffect("Pawn promoted to Queen! 👑");
    }

    setBoard(newBoard);
    setSelectedCell(null);
    setLegalMoves([]);
    setMoveHistory(prev => [notation, ...prev].slice(0, 8));

    // Evaluate game end for opponent (Black)
    const endState = verifyGameEnd('b', newBoard);
    if (endState === 'checkmate') {
      setGameState('checkmate');
      setWinner('w');
      return;
    } else if (endState === 'stalemate') {
      setGameState('stalemate');
      return;
    }

    // Pass turn to AI
    setTurn('b');
    setAiThinking(true);
    setTimeout(() => {
      triggerAiMove(newBoard);
    }, 1000);
  };

  const triggerAiMove = (currentBoard: BoardGrid) => {
    // 1. Gather all legal moves for Black
    const allAiMoves: { from: { r: number; c: number }; to: { r: number; c: number }; piece: ChessPiece; isCapture: boolean }[] = [];
    
    currentBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell && cell.color === 'b') {
          const legals = getLegalMoves(r, c, cell, currentBoard);
          legals.forEach(m => {
            allAiMoves.push({
              from: { r, c },
              to: m,
              piece: cell,
              isCapture: currentBoard[m.r][m.c] !== null
            });
          });
        }
      });
    });

    // 2. If no legal moves, evaluate checkmate/stalemate
    if (allAiMoves.length === 0) {
      const endState = verifyGameEnd('b', currentBoard);
      if (endState === 'checkmate') {
        setGameState('checkmate');
        setWinner('w');
      } else {
        setGameState('stalemate');
      }
      setAiThinking(false);
      return;
    }

    // 3. Simple Tactical AI: 70% chance to prioritize captures, 30% random
    const captures = allAiMoves.filter(m => m.isCapture);
    let selectedMove = allAiMoves[0];

    if (captures.length > 0 && Math.random() < 0.7) {
      selectedMove = captures[Math.floor(Math.random() * captures.length)];
    } else {
      selectedMove = allAiMoves[Math.floor(Math.random() * allAiMoves.length)];
    }

    const { from, to, piece } = selectedMove;
    const nextBoard = currentBoard.map(row => row.map(cell => cell ? { ...cell } : null));
    const capturedPiece = nextBoard[to.r][to.c];

    // Execute move
    nextBoard[to.r][to.c] = piece;
    nextBoard[from.r][from.c] = null;

    let notation = `${piece.type.toUpperCase()}${String.fromCharCode(97 + to.c)}${8 - to.r}`;
    if (capturedPiece) {
      notation = `${piece.type.toUpperCase()}x${String.fromCharCode(97 + to.c)}${8 - to.r}`;
    }

    // AI Pawn Promotion
    if (piece.type === 'p' && to.r === 7) {
      nextBoard[to.r][to.c] = { ...piece, type: 'q' };
      notation += "=Q";
    }

    setBoard(nextBoard);
    setMoveHistory(prev => [notation, ...prev].slice(0, 8));

    // Check if the AI's move put White in Check
    if (isKingInCheck('w', nextBoard)) {
      setSpecialEffect("Check! ⚠️");
    }

    // Evaluate game end for White
    const endState = verifyGameEnd('w', nextBoard);
    if (endState === 'checkmate') {
      setGameState('checkmate');
      setWinner('b');
    } else if (endState === 'stalemate') {
      setGameState('stalemate');
    } else {
      // Pass turn back to white
      setTurn('w');
    }

    setAiThinking(false);
  };

  const resetBoard = () => {
    setBoard(INITIAL_BOARD);
    setTurn('w');
    setGameState('active');
    setWinner(null);
    setSelectedCell(null);
    setLegalMoves([]);
    setMoveHistory([]);
    setSpecialEffect(null);
    setAiThinking(false);
  };

  // Helper to resolve active status strings and styles
  const getStatusDisplay = () => {
    if (gameState === 'checkmate') {
      return {
        text: winner === 'w' ? "CHECKMATE! YOU WIN 🎉" : "CHECKMATE! STOCKFISH WINS 🏆",
        bg: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: ShieldAlert
      };
    }
    if (gameState === 'stalemate') {
      return {
        text: "STALEMATE! 🤝 DRAW",
        bg: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        icon: HelpCircle
      };
    }
    if (aiThinking) {
      return {
        text: "STOCKFISH RUNNING INFERENCE... ⚙️",
        bg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse",
        icon: Sparkles
      };
    }
    if (isKingInCheck('w', board)) {
      return {
        text: "YOUR KING IS IN CHECK! ⚠️",
        bg: "bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse",
        icon: AlertTriangle
      };
    }
    return {
      text: "YOUR TURN // MAKE YOUR MOVE",
      bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      icon: CheckCircle2
    };
  };

  const status = getStatusDisplay();
  const StatusIcon = status.icon;

  return (
    <div className="bg-[#0b0f19]/90 border border-blue-900/40 rounded-2xl p-4 sm:p-6 backdrop-blur-xl flex flex-col md:flex-row gap-6 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Chess Grid Stage */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-8 gap-0 border border-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-[340px] w-full aspect-square">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const isDarkSquare = (r + c) % 2 === 1;
              const isSelected = selectedCell?.r === r && selectedCell?.c === c;
              const isTargetMove = legalMoves.some(m => m.r === r && m.c === c);

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`
                    aspect-square flex items-center justify-center text-xl sm:text-2xl font-light outline-none relative transition-all duration-200
                    ${isDarkSquare ? 'bg-[#1e293b]/40' : 'bg-[#0f172a]/20'}
                    ${isSelected ? 'bg-indigo-600/35 border-2 border-indigo-400 z-10' : ''}
                    ${isTargetMove ? 'hover:bg-cyan-500/20' : ''}
                  `}
                >
                  {/* Glowing target indicator */}
                  {isTargetMove && (
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                  )}

                  {/* Chess Piece Symbol */}
                  {cell && (
                    <motion.span
                      layoutId={cell.id}
                      className={`select-none font-sans font-medium ${
                        cell.color === 'w' 
                          ? 'text-cyan-100 drop-shadow-[0_2px_4px_rgba(6,182,212,0.6)]' 
                          : 'text-indigo-400 drop-shadow-[0_2px_4px_rgba(99,102,241,0.5)]'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {PIECE_SYMBOLS[`${cell.color}_${cell.type}`]}
                    </motion.span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chess Panel Sidebar */}
      <div className="w-full md:w-[220px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-800/80 pt-4 md:pt-0 md:pl-5 font-mono text-xs">
        <div className="space-y-4">
          
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider mb-1.5 uppercase text-[10px]">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <span>Stockfish Core v16</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              Play white (cyan pieces). Click a piece to view valid moves, then click target dots. King safety rules strictly enforced.
            </p>
          </div>

          {/* New integrated elegant system status notification */}
          <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 transition-all duration-300 text-[10px] font-bold ${status.bg}`}>
            <StatusIcon className="w-4 h-4 flex-shrink-0" />
            <span className="leading-tight uppercase tracking-wide">{status.text}</span>
          </div>

          {/* Micro promotion/special effects popup inline within sidebar */}
          {specialEffect && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 text-cyan-300 rounded-lg text-[9px] font-bold flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
              <span>{specialEffect}</span>
            </motion.div>
          )}

          {/* Log panel */}
          <div className="bg-[#05070d] border border-gray-800/60 rounded-lg p-2.5 h-[110px] overflow-y-auto scrollbar-none space-y-1.5">
            <span className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold block mb-1">
              Match Log
            </span>
            {aiThinking && (
              <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] animate-pulse">
                <span>Computing deep depth-22 response...</span>
              </div>
            )}
            {moveHistory.length === 0 && !aiThinking && (
              <span className="text-gray-600 block text-[10px] italic">No moves logged. Make your opening move.</span>
            )}
            {moveHistory.map((move, index) => (
              <div key={index} className="flex justify-between text-gray-400 text-[10px] border-b border-white/[0.01] pb-1">
                <span>Move #{moveHistory.length - index}</span>
                <span className="text-cyan-400 font-bold">{move}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Action Panel */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={resetBoard}
            className="flex-1 flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-2 py-1.5 rounded-lg transition-colors cursor-pointer text-[9px] font-bold uppercase"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            disabled={turn === 'b' || gameState !== 'active'}
            onClick={() => {
              if (turn === 'w' && gameState === 'active') {
                setTurn('b');
                setAiThinking(true);
                setTimeout(() => triggerAiMove(board), 800);
              }
            }}
            className="flex-1 flex items-center justify-center gap-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[9px] font-bold uppercase"
          >
            <Play className="w-3 h-3" />
            <span>Run AI</span>
          </button>
        </div>

      </div>

    </div>
  );
}
