'use client';
import { ObstaclesGap, Game, Difficulty } from '@flappy-bird/core';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import useKeyPress from '../hook/useKeyPress';

interface IGameContext {
  bird: Game['bird'];
  game: Game;
  obstacles: Game['obstacles']['obstacles'];
  paused: boolean;
  reset: () => void;
  restart: (props?: { difficulty?: Difficulty; gap?: ObstaclesGap }) => void;
  setSpeed: (speed: number) => void;
  speed: number;
  togglePause: () => void;
}

const GameContext = createContext<IGameContext>({} as IGameContext);

export const useGameContext = () => useContext(GameContext);

interface Props {
  children: ReactNode;
}

const INITIAL_SPEED = 10;
const SPACE_KEY = ' ';

export function GameProvider({ children }: Props) {
  const flying = useKeyPress(SPACE_KEY);

  const [game, setGame] = useState(Game.new());
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  useEffect(() => {
    const animateInterval = setInterval(() => {
      if (paused) return;

      setGame((game) => game.animate());
    }, speed);

    return () => clearInterval(animateInterval);
  }, [speed, paused]);

  useEffect(() => {
    if (flying && game.bird.flying) return;

    if (!flying && !game.bird.flying) return;

    setGame(game.isBirdFlying(flying));
  }, [flying, game]);

  const togglePause = () => {
    setPaused((paused) => !paused);
  };

  const restart = (
    props: { difficulty?: Difficulty; gap?: ObstaclesGap } = {},
  ) => {
    setGame(
      game.restart({
        difficulty: props.difficulty,
        gap: props.gap,
      }),
    );

    setPaused(false);
  };

  const reset = () => {
    setGame(game.reset());

    setSpeed(INITIAL_SPEED);
    setPaused(false);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        paused,
        speed,
        get bird() {
          return game.bird;
        },
        get obstacles() {
          return game.obstacles.obstacles;
        },
        restart,
        reset,
        setSpeed,
        togglePause,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
