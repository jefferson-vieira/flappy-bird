import { useGameContext } from '@/data/context/game';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

export default function Controls() {
  const { paused, restart, reset, togglePause } = useGameContext();

  return (
    <ButtonGroup label="Comandos">
      <Button
        color={paused ? 'bg-red-500' : 'bg-purple-500'}
        onClick={() => togglePause()}
      >
        Pausar
      </Button>

      <Button color="bg-purple-600" onClick={() => restart()}>
        Reiniciar
      </Button>

      <Button color="bg-purple-700" onClick={() => reset()}>
        Zerar
      </Button>
    </ButtonGroup>
  );
}
