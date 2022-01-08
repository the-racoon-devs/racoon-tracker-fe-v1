/**
 *
 * Button
 *
 */
import * as React from 'react';
import { useEffect, useState } from 'react';

interface Props {
  size?: string;
  color?: string;
  icon?: string;
  iconPlacement?: string;
  round?: boolean;
  circle?: boolean;
  children?: React.ReactFragment;
}

export function Button(props: Props) {
  const [Color, setColor] = useState(props.color);
  const [Size, setSize] = useState(props.color);

  useEffect(() => {
    // Setting color
    switch (props.color) {
      case 'secondary':
        setColor(
          'bg-secondary-600 hover:bg-secondary-700 text-white border border-transparent ',
        );
        break;

      case 'white':
        setColor(
          'bg-white hover:bg-white text-black border border-transparent ',
        );
        break;

      default:
        setColor(
          'bg-primary-600 hover:bg-primary-700 text-white border border-gray-300 ',
        );
        break;
    }

    // Setting size
    switch (props.size) {
      case 'xs':
        setSize('px-2.5 py-1.5 text-xs rounded');
        break;

      case 's':
        setSize('px-3 py-2 text-sm leading-4 rounded-md');
        break;

      case 'l':
        setSize('px-4 py-2 text-base rounded-md');
        break;

      case 'xl':
        setSize('px-6 py-3 text-base rounded-md');
        break;

      default:
        setSize('px-4 py-2 text-sm rounded-md');
        break;
    }
  }, [props.color, props.size]);

  return (
    <button
      type="button"
      className={
        'inline-flex items-center font-medium shadow-sm focus:outline-none ' +
        Color +
        Size
      }
    >
      {props.children}
    </button>
  );
}
