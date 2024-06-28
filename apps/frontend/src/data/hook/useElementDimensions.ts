import { useState, useEffect, useRef, Ref } from 'react';

export default function useElementDimensions<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    ref.current &&
      new ResizeObserver(() => {
        setHeight(ref.current?.clientHeight ?? 0);
        setWidth(ref.current?.clientWidth ?? 0);
      }).observe(ref.current);
  }, [ref]);

  return {
    ref,
    height,
    width,
  };
}
