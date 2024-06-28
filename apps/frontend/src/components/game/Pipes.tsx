import Pipe from './Pipe';

export interface Props {
  top: number;
  bottom: number;
  width: number;
  position: number;
}

export default function Pipes({ top, bottom, width, position }: Props) {
  return (
    <div
      style={{
        width: `${width * 100}%`,
        left: `${position * 100}%`,
      }}
      className="absolute flex flex-col justify-between h-full [&>*+*]:flex-col-reverse"
    >
      <Pipe size={top} />

      <Pipe size={bottom} />
    </div>
  );
}
