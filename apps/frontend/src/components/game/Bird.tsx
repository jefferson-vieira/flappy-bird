import Image from 'next/image';

import image from '@/../public/passaro.png';
import useElementDimensions from '@/data/hook/useElementDimensions';
import { useGameContext } from '@/data/context/game';

export default function Bird() {
  const { bird } = useGameContext();

  const { ref, height, width } = useElementDimensions<HTMLDivElement>();

  return (
    <div ref={ref} className="relative w-full h-full z-50">
      <div
        className="absolute"
        style={{
          bottom: bird.altitude.value * height,
          height: height * bird.height.value,
          width: width * bird.width.value,
          left: width / 2,
        }}
      >
        <Image alt="Pássaro" className="h-full w-full" src={image} />
      </div>
    </div>
  );
}
