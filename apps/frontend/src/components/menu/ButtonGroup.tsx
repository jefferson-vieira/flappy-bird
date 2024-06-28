import { Children, cloneElement, ReactElement } from 'react';
import { Props as ButtonProps } from './Button';

interface Props {
  children: ReactElement<ButtonProps>[];
  label: string;
}

const ButtonGroup = ({ children, label }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl">{label}</span>

      <div className="flex">
        {Children.map(children, (child, index) => {
          const firstChildIndex = 0;
          const lastChildIndex = Children.count(children) - 1;

          if (index === firstChildIndex) {
            return cloneElement(child, {
              noRightBorder: true,
            });
          }

          if (index === lastChildIndex) {
            return cloneElement(child, {
              noLeftBorder: true,
            });
          }

          return cloneElement(child, {
            noBorder: true,
          });
        })}
      </div>
    </div>
  );
};

export default ButtonGroup;
