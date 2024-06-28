import { useGameContext } from '@/data/context/game';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

enum Speeds {
  SLOW = 20,
  NORMAL = 10,
  FAST = 6,
  JEDI = 3,
}

export default function SpeedSelector() {
  const { speed, setSpeed } = useGameContext();

  const buildHandleSpeedChange = (speed: Speeds) => () => {
    setSpeed(speed);
  };

  return (
    <ButtonGroup label="Velocidade do Jogo">
      <Button
        color={speed === Speeds.SLOW ? 'bg-red-500' : 'bg-zinc-400'}
        onClick={buildHandleSpeedChange(Speeds.SLOW)}
      >
        Lento
      </Button>

      <Button
        color={speed === Speeds.NORMAL ? 'bg-red-500' : 'bg-zinc-500'}
        onClick={buildHandleSpeedChange(Speeds.NORMAL)}
      >
        Normal
      </Button>

      <Button
        color={speed === Speeds.FAST ? 'bg-red-500' : 'bg-zinc-600'}
        onClick={buildHandleSpeedChange(Speeds.FAST)}
      >
        Rápido
      </Button>

      <Button
        color={speed === Speeds.JEDI ? 'bg-red-500' : 'bg-zinc-700'}
        onClick={buildHandleSpeedChange(Speeds.JEDI)}
      >
        Jedi
      </Button>
    </ButtonGroup>
  );
}
