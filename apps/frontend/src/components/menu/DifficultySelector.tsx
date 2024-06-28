import { Difficulty } from '@flappy-bird/core';

import { useGameContext } from '@/data/context/game';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

export default function DifficultySelector() {
  const { game, restart } = useGameContext();

  const { difficulty } = game;

  const buildHandleDifficultyChange = (difficulty: Difficulty) => () => {
    restart({ difficulty });
  };

  return (
    <ButtonGroup label="Nível de Dificuldade">
      <Button
        color={difficulty === Difficulty.EASY ? 'bg-red-500' : 'bg-zinc-400'}
        onClick={buildHandleDifficultyChange(Difficulty.EASY)}
      >
        Fácil
      </Button>

      <Button
        color={difficulty === Difficulty.MEDIUM ? 'bg-red-500' : 'bg-zinc-500'}
        onClick={buildHandleDifficultyChange(Difficulty.MEDIUM)}
      >
        Médio
      </Button>

      <Button
        color={difficulty === Difficulty.HARD ? 'bg-red-500' : 'bg-zinc-600'}
        onClick={buildHandleDifficultyChange(Difficulty.HARD)}
      >
        Difícil
      </Button>

      <Button
        color={difficulty === Difficulty.JEDI ? 'bg-red-500' : 'bg-zinc-700'}
        onClick={buildHandleDifficultyChange(Difficulty.JEDI)}
      >
        Jedi
      </Button>
    </ButtonGroup>
  );
}
