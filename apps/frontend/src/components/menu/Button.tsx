import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { useRef } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  noBorder?: boolean;
  noLeftBorder?: boolean;
  noRightBorder?: boolean;
}

export default function Button({
  children,
  className,
  color,
  noBorder,
  noLeftBorder,
  noRightBorder,
  onClick,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);

    buttonRef.current?.blur();
  };

  return (
    <button
      ref={buttonRef}
      className={`flex items-center outline-none ${className ?? ''}`}
      onClick={handleClick}
    >
      {noLeftBorder || noBorder ? null : (
        <>
          <div className={`${color} h-3 w-1`}></div>
          <div className={`${color} h-5 w-1`}></div>
          <div className={`${color} h-7 w-1`}></div>
        </>
      )}

      <div className={`${color} h-8 px-2`}>
        <span className="text-2xl">{children}</span>
      </div>

      {noRightBorder || noBorder ? null : (
        <>
          <div className={`${color} h-7 w-1`}></div>
          <div className={`${color} h-5 w-1`}></div>
          <div className={`${color} h-3 w-1`}></div>
        </>
      )}
    </button>
  );
}
