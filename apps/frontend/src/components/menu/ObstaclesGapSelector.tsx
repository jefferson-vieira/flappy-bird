import { ObstaclesGap } from '@flappy-bird/core';

import { useGameContext } from '@/data/context/game';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

export default function ObstaclesGapSelector() {
  const { game, restart } = useGameContext();

  const buildHandleObstaclesGapChange = (gap: ObstaclesGap) => () => {
    restart({ gap });
  };

  const { gap } = game;

  return (
    <ButtonGroup label="Espaço entre Obstáculos">
      <Button
        color={gap === ObstaclesGap.LARGER ? 'bg-red-500' : 'bg-zinc-400'}
        onClick={buildHandleObstaclesGapChange(ObstaclesGap.LARGER)}
      >
        Maior
      </Button>

      <Button
        color={gap === ObstaclesGap.NORMAL ? 'bg-red-500' : 'bg-zinc-500'}
        onClick={buildHandleObstaclesGapChange(ObstaclesGap.NORMAL)}
      >
        Normal
      </Button>

      <Button
        color={gap === ObstaclesGap.SMALLER ? 'bg-red-500' : 'bg-zinc-600'}
        onClick={buildHandleObstaclesGapChange(ObstaclesGap.SMALLER)}
      >
        Menor
      </Button>
    </ButtonGroup>
  );
}
