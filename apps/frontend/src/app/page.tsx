'use client';

import Pipes from '@/components/game/Pipes';
import Bird from '@/components/game/Bird';
import Controls from '@/components/menu/Controls';
import ObstaclesGapSelector from '@/components/menu/ObstaclesGapSelector';
import DifficultySelector from '@/components/menu/DifficultySelector';
import SpeedSelector from '@/components/menu/SpeedSelector';
import { useGameContext } from '@/data/context/game';

export default function Home() {
  const { game, obstacles } = useGameContext();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl">
        <span className="text-red-400">Flappy</span>{' '}
        <span className="text-green-400">Bird</span>{' '}
        <span className="text-blue-400">Limpo</span>
      </h1>

      <div className="flex p-5 justify-between gap-5">
        <SpeedSelector />

        <DifficultySelector />

        <ObstaclesGapSelector />

        <Controls />
      </div>

      <div className="flex w-4/6 h-4/6 relative overflow-hidden bg-background bg-no-repeat bg-cover	bg-blue-400 border-4 border-blue-500">
        <h1 className="absolute text-yellow-400 text-6xl whitespace-nowrap p-5 z-10">
          {game.score.value} / {game.record.value}
        </h1>

        <Bird />

        {obstacles.map((obstacle, i) => (
          <Pipes
            key={i}
            top={obstacle.top.value}
            bottom={obstacle.bottom.value}
            width={obstacle.width.value}
            position={obstacle.position.value}
          />
        ))}
      </div>
    </main>
  );
}
