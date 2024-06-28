import { useEffect, useState } from 'react';

interface Props {
  size: number;
}

export default function Pipe({ size }: Props) {
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, []);

  return inBrowser ? (
    <div
      className="flex items-center flex-col"
      style={{
        height: `${size * 100}%`,
      }}
    >
      <div
        className="
                    h-full w-11/12 border-l-2 border-r-2 border-black
                    bg-gradient-to-r from-green-400 to-green-700
                "
      ></div>

      <div
        className="
                    w-full h-8 border-2 border-black
                    bg-gradient-to-r from-green-400 to-green-700
                "
      ></div>
    </div>
  ) : null;
}
